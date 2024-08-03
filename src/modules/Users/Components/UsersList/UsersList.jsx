
import userImage from "../../../../assets/images/head1.png"
import Header from './../../../Shared/Components/Header/Header';

export default function UsersList() {
    return (
        <div>
            <Header image={userImage} title={"Users  List "} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} />
        </div>
    )
}
