import { create } from "zustand"
import { devtools } from "zustand/middleware";

type ScheduleType = 'daily' | 'weekly' | 'monthly';


interface SubscriptionStore {
    subscriptions: Record<number, string>;
    setSchedule: (productId: number, schedule: string) => void;
}


export const useSubscriptionStore = create<SubscriptionStore>()(
    devtools(
        (set, get) => ({
            subscriptions: {},
            setSchedule: async (productId, schedule) => {
                set((state) => ({
                    subscriptions: {
                        ...state.subscriptions,
                        [productId]:schedule
                    }
                }))
            }
        }),
        {
            name: "subscription store"
        }
    )
)