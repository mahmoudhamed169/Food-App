import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import Image from "../../../../assets/images/head1.png"

export default function RecipesList() {
    return (
        <div>
            <Header image={Image} title={"Recipes Item"} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} />
        </div>
    )
}
