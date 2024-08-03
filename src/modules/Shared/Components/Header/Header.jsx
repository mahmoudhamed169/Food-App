


export default function Header({ image, title, paragraph }) {
    return (

        <div className="header-content text-white rounded">
            <div className="row align-items-center  mx-2 px-3">
                <div className="col-md-9">
                    <h3 className="px-5">{title}</h3>
                    <p className={` ${title === "Welcome  Upskilling !" ? "w-75" : "w-50"} px-5 mt-3 `}>
                        {paragraph}
                    </p>
                </div>
                <div className="col-md-3">
                    <div>
                        <img src={image} className="headerImg img-fluid" alt="header" />
                    </div>
                </div>
            </div>
        </div >

    )
}
