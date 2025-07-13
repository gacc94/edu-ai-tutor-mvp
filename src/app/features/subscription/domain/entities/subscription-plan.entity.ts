export enum PlanType {
    FREE = 'free',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

export enum PlanStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    TRIAL = 'trial',
    EXPIRED = 'expired',
}

export interface SubscriptionPlanProps {
    id: string;
    type: PlanType;
    name: string;
    price: number;
    originalPrice?: number;
    currency: string;
    duration: string;
    features: string[];
    isPopular: boolean;
    trialDays?: number;
    credits: number;
    isUnlimited: boolean;
}

export class SubscriptionPlan {
    private constructor(private readonly props: SubscriptionPlanProps) {}

    static create(props: SubscriptionPlanProps): SubscriptionPlan {
        return new SubscriptionPlan(props);
    }

    // Getters
    get id(): string {
        return this.props.id;
    }

    get type(): PlanType {
        return this.props.type;
    }

    get name(): string {
        return this.props.name;
    }

    get price(): number {
        return this.props.price;
    }

    get originalPrice(): number | undefined {
        return this.props.originalPrice;
    }

    get currency(): string {
        return this.props.currency;
    }

    get duration(): string {
        return this.props.duration;
    }

    get features(): string[] {
        return this.props.features;
    }

    get isPopular(): boolean {
        return this.props.isPopular;
    }

    get trialDays(): number | undefined {
        return this.props.trialDays;
    }

    get credits(): number {
        return this.props.credits;
    }

    get isUnlimited(): boolean {
        return this.props.isUnlimited;
    }

    get hasDiscount(): boolean {
        return this.props.originalPrice !== undefined && this.props.originalPrice > this.props.price;
    }

    get discountPercentage(): number {
        if (!this.hasDiscount || !this.props.originalPrice) return 0;
        return Math.round(((this.props.originalPrice - this.props.price) / this.props.originalPrice) * 100);
    }

    get formattedPrice(): string {
        return `${this.props.currency}${this.props.price.toFixed(2)}`;
    }

    get formattedOriginalPrice(): string {
        if (!this.props.originalPrice) return '';
        return `${this.props.currency}${this.props.originalPrice.toFixed(2)}`;
    }

    get isFree(): boolean {
        return this.props.type === PlanType.FREE;
    }

    get isYearly(): boolean {
        return this.props.type === PlanType.YEARLY;
    }

    get isMonthly(): boolean {
        return this.props.type === PlanType.MONTHLY;
    }
}
