export const context = async () => {
  return {
    shishi: "coco",
  };
};

export type TContext = typeof context;
