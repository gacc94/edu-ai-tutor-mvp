import { Injectable, signal, linkedSignal } from '@angular/core';
import { UserCredits, CreditTransaction, CreditsState } from '@shared/interfaces/credits.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class CreditsService {
    private readonly INITIAL_CREDITS = 10;
    private readonly MAX_CREDITS = 50;

    private _creditsState = signal<CreditsState>({
        credits: {
            current: this.INITIAL_CREDITS,
            maximum: this.MAX_CREDITS,
            lastUpdated: new Date(),
        },
        transactions: [],
        isLoading: false,
    });

    // Computed signals for easy access
    $credits = linkedSignal(() => this._creditsState().credits);
    $currentCredits = linkedSignal(() => this._creditsState().credits.current);
    $maxCredits = linkedSignal(() => this._creditsState().credits.maximum);
    $transactions = linkedSignal(() => this._creditsState().transactions);
    $isLoading = linkedSignal(() => this._creditsState().isLoading);
    $creditsPercentage = linkedSignal(() => Math.round((this.$currentCredits() / this.$maxCredits()) * 100));
    $hasCredits = linkedSignal(() => this.$currentCredits() > 0);
    $isLowCredits = linkedSignal(() => this.$currentCredits() <= 3);

    /**
     * Consume credits for a chat message
     * @param amount Amount of credits to consume
     * @param description Description of the transaction
     * @returns Promise<boolean> Success status
     */
    async consumeCredits(amount: number = 1, description: string = 'Pregunta enviada'): Promise<boolean> {
        const currentState = this._creditsState();

        if (currentState.credits.current < amount) {
            return false;
        }

        const newTransaction: CreditTransaction = {
            id: uuidv4(),
            amount: -amount,
            type: 'consumed',
            description,
            timestamp: new Date(),
        };

        const updatedCredits: UserCredits = {
            ...currentState.credits,
            current: currentState.credits.current - amount,
            lastUpdated: new Date(),
        };

        this._creditsState.set({
            ...currentState,
            credits: updatedCredits,
            transactions: [newTransaction, ...currentState.transactions],
        });

        // Save to localStorage for persistence
        this._saveToStorage();

        return true;
    }

    /**
     * Add credits to user account
     * @param amount Amount of credits to add
     * @param description Description of the transaction
     */
    async addCredits(amount: number, description: string = 'Créditos añadidos'): Promise<void> {
        const currentState = this._creditsState();

        const newTransaction: CreditTransaction = {
            id: uuidv4(),
            amount: amount,
            type: 'added',
            description,
            timestamp: new Date(),
        };

        const newCurrent = Math.min(currentState.credits.current + amount, currentState.credits.maximum);

        const updatedCredits: UserCredits = {
            ...currentState.credits,
            current: newCurrent,
            lastUpdated: new Date(),
        };

        this._creditsState.set({
            ...currentState,
            credits: updatedCredits,
            transactions: [newTransaction, ...currentState.transactions],
        });

        this._saveToStorage();
    }

    /**
     * Reset credits to initial amount
     */
    async resetCredits(): Promise<void> {
        const currentState = this._creditsState();

        const newTransaction: CreditTransaction = {
            id: uuidv4(),
            amount: this.INITIAL_CREDITS - currentState.credits.current,
            type: 'added',
            description: 'Créditos reiniciados',
            timestamp: new Date(),
        };

        const updatedCredits: UserCredits = {
            current: this.INITIAL_CREDITS,
            maximum: this.MAX_CREDITS,
            lastUpdated: new Date(),
        };

        this._creditsState.set({
            ...currentState,
            credits: updatedCredits,
            transactions: [newTransaction, ...currentState.transactions],
        });

        this._saveToStorage();
    }

    /**
     * Load credits from localStorage
     */
    loadCreditsFromStorage(): void {
        try {
            const stored = localStorage.getItem('eduai_credits');
            if (stored) {
                const parsedState = JSON.parse(stored);
                // Convert date strings back to Date objects
                parsedState.credits.lastUpdated = new Date(parsedState.credits.lastUpdated);
                parsedState.transactions = parsedState.transactions.map((t: any) => ({
                    ...t,
                    timestamp: new Date(t.timestamp),
                }));

                this._creditsState.set(parsedState);
            }
        } catch (error) {
            console.warn('Error loading credits from storage:', error);
        }
    }

    /**
     * Save credits to localStorage
     */
    private _saveToStorage(): void {
        try {
            localStorage.setItem('eduai_credits', JSON.stringify(this._creditsState()));
        } catch (error) {
            console.warn('Error saving credits to storage:', error);
        }
    }
}
