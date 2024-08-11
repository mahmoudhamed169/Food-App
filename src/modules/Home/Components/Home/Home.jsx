
import Header from '../../../Shared/Components/Header/Header'
import homeImg from "../../../../assets/images/home.png"
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className='mx-3'>
            <Header image={homeImg} title={"Welcome  Upskilling !"} paragraph={"This is a welcoming screen for the entry of the application , you can now see the options"} />
            <div className='d-flex justify-content-between my-4 align-items-center p-5 rounded-5' style={{ background: "#F0FFEF" }}>
                <div>
                    <h2 className='m-1 fw-bold'>
                        Fill the <span className='text-success'>Recipes </span>!

                    </h2>
                    <p className='ms-1'>you can now fill the meals easily using the table and form ,  <br />click here and sill it with the table !</p>

                </div>

                <div>
                    <button className='btn btn-success px-5' onClick={() => { navigate("/dashboard/recipestList") }} >Fill Recipes <i className="fa-solid fa-arrow-right mx-2"></i></button>
                </div>
            </div>
        </div>
    )
}
