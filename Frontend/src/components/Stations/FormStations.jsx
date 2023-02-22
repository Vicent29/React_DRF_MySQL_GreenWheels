import { useForm } from "react-hook-form"

export default function CreateStation({ createStation }) {

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <form className="w-full max-w-sm" onSubmit={handleSubmit(createStation)}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input {...register("name", { required: true })} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-img">
                        Img
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input {...register("img", { required: false })} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                </div>
            </div>
            <div className="md:flex md:items-center mb-7 md:mb-0">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Create Station
                    </button>
                </div>
            </div>
        </form>
    )
}