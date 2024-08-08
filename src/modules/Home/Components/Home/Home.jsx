
import Header from '../../../Shared/Components/Header/Header'
import homeImg from "../../../../assets/images/home.png"

export default function Home() {
    return (
        <div className='mx-3'>
            <Header image={homeImg} title={"Welcome  Upskilling !"} paragraph={"This is a welcoming screen for the entry of the application , you can now see the options"} />
        </div>
    )
}
