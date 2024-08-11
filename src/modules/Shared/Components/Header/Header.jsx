


export default function Header({ image, title, paragraph }) {
    return (

        <div className="header-container text-white rounded-3  ">
            <div className="header-content ">
                <div className="row align-items-center justify-content-center  mx-2 px-3">
                    <div className="col-md-6 ">
                        <h3 className="px-5 mt-3">{title}</h3>
                        <p className={` px-5 mt-3 `}>
                            {paragraph}
                        </p>
                    </div>
                    <div className="col-md-6  d-flex justify-content-end">
                        <div>
                            <img src={image} className="headerImg img-fluid " alt="header" />
                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}
