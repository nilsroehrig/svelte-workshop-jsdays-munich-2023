import { writable } from "svelte/store";

export function createEstimationStore(startValue = []) {
  const { update, subscribe } = writable(startValue);

  return {
    subscribe,
    add(newEstimation) {
      update((estimations) => {
        if (
          estimations.find(
            (oldEstimation) => oldEstimation.id === newEstimation.id
          )
        ) {
          return estimations;
        }

        return estimations.concat(newEstimation);
      });
    },
    update(updatedEstimation) {
      update((estimations) =>
        estimations.map((oldEstimation) => {
          if (oldEstimation.id === updatedEstimation.id) {
            return updatedEstimation;
          }
          return oldEstimation;
        })
      );
    },
    delete(id) {
      update((estimations) =>
        estimations.filter((oldEstimation) => oldEstimation.id !== id)
      );
    },
  };
}
