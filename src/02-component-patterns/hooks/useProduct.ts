import { useEffect, useRef, useState } from "react";
import { onChangeArgs, Product } from "../interfaces/interfaces";

interface useProductArgs {
  product: Product;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
}: useProductArgs) => {
  const [counter, setCounter] = useState(value);

  /* Voy a incrementar la funcionalidad. 
     Para ver si  estas propiedades controladas necesito saber si se ha implementado el onChange
      como no quiero renderizar cada vez voy a usar un useRef. 
      Ojo con la sintaxis !onChange es un operador (si no existe el onChange)
      !!onChange es la negacion del onChange qie es true. Es decir si no existe onChange devuelve true.
   */
  const isControlled = useRef(!!onChange);

  // Necesitamos que se vuelva a renderizar cuando value aparezca
  // Eso lo controlamos con un useEffect
  useEffect(() => {
    setCounter(value);
  }, [value]);

  const increaseBy = (value: number) => {
    // console.log("isControlled", isControlled.current);

    if (isControlled.current) {
      // Si esta controlado no quiero que setee el estado . Ya lo esta realizando donde se ejecute este hook
      // llamo al onChange. sintaxis onChange! es la manera corta de decir
      //a typeScript "confia que siempre va a venir un valor" eslo mismq que escribir: isControlled.current && onChange
      // solo que un poquito mas eficiente
      return onChange!({ count: value, product });
    }

    const newValue = Math.max(counter + value, 0);
    setCounter(newValue);
    onChange && onChange({ count: newValue, product });
  };

  return { counter, increaseBy };
};
