import { create } from "zustand"
import { devtools } from "zustand/middleware";

interface SubscriptionStore {
    subscriptions: Record<number, string>;
    setSchedule: (productId: number, schedule: string) => void;
}


export const useSubscriptionStore = create<SubscriptionStore>()(
    devtools(
        (set) => ({
            subscriptions: {},
            setSchedule: (productId, schedule) => {
                console.log("Setting schedule:", { productId, schedule });
                set((state) => ({
                    subscriptions: {
                      ...state.subscriptions,
                      [productId]: schedule
                    }
                    
                })
                )
            }
        }),
        {
            name: "subscription store"
        }
    )
)