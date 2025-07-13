import { SubscriptionPlan, SubscriptionPlanProps, PlanType } from '../entities/subscription-plan.entity';

export class SubscriptionPlanFactory {
    static createMonthlyPlan(): SubscriptionPlan {
        return SubscriptionPlan.create({
            id: 'monthly-pro',
            type: PlanType.MONTHLY,
            name: 'Tutor AI Pro',
            price: 26.99,
            originalPrice: 29.99,
            currency: 'PEN',
            duration: '/mes',
            features: [
                'Tutores AI ilimitados',
                'Chat ilimitado con tu AI Tutor',
                'Sin anuncios',
                'Acceso a todas las nuevas funciones premium',
            ],
            isPopular: false,
            credits: -1, // Unlimited
            isUnlimited: true,
        });
    }

    static createYearlyPlan(): SubscriptionPlan {
        return SubscriptionPlan.create({
            id: 'yearly-pro',
            type: PlanType.YEARLY,
            name: 'Tutor AI Pro',
            price: 149.99,
            originalPrice: 359.88, // 29.99 * 12
            currency: 'PEN',
            duration: '/año',
            features: [
                'Tutores AI ilimitados',
                'Chat ilimitado con tu AI Tutor',
                'Sin anuncios',
                'Acceso a todas las nuevas funciones premium',
            ],
            isPopular: true,
            trialDays: 3,
            credits: -1, // Unlimited
            isUnlimited: true,
        });
    }

    static createFreePlan(): SubscriptionPlan {
        return SubscriptionPlan.create({
            id: 'free',
            type: PlanType.FREE,
            name: 'Plan Gratuito',
            price: 0,
            currency: 'PEN',
            duration: '',
            features: ['10 créditos por día', 'Funciones básicas', 'Anuncios incluidos'],
            isPopular: false,
            credits: 10,
            isUnlimited: false,
        });
    }

    static getAllPlans(): SubscriptionPlan[] {
        return [this.createYearlyPlan(), this.createMonthlyPlan()];
    }
}
