import { TextField } from '@mui/material'

const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center h-auto">
      <form>
        <div className="bg-white p-4 rounded-t-xl shadow-lg w-80">
          <h2 className="text-xl font-bold text-center mb-4">
            Crea una cuenta
          </h2>

          <div className="mb-4">
            <div className="relative">
              <TextField
                size="small"
                className="w-full  border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                label="User"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <TextField
                size="small"
                className="w-full  border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                label="Nombre"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <TextField
                size="small"
                className="w-full  border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                label="Contraseña"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <TextField
                size="small"
                className="w-full  border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                label="Salario"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2.5 rounded-lg hover:bg-gray-800"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
