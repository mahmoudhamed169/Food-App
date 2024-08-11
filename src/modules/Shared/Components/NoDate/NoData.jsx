
import noData from "../../../../assets/images/nodata.png"

export default function NoData() {
    return (
        <div >
            <img src={noData} className="img-fluid" />
            <h4 className=" fw-bold mt-2"> No Data !</h4>
            <p className="text-muted">
                are you sure you want to delete this item ? if you are sure just <br /> click on delete it
            </p>

        </div>
    )
}
