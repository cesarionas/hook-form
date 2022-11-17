import { set, useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const onSubmit = (e) => {
    console.log(e);
  };

  const checkCep = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json()).then(data => {
      console.log(data);
      setValue('address', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue ('uf', data.uf);
      setFocus('addressNumber');
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        CEP:
        <input type="text" {...register("cep")} onBlur={checkCep} />
      </label>
      <label>
        Rua:
        <input type="text" {...register("address")} />
      </label>
      <label>
        Numero:
        <input type="text" {...register("addressNumber")} />
      </label>
      <label>
        Bairro:
        <input type="text" {...register("neighborhood")} />
      </label>
      <label>
        Estado:
        <input type="text" {...register("uf")} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;
