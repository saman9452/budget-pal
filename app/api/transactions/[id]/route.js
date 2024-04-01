import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Transaction from "../../../../models/transaction";

export async function PUT(req, {params}) {
    const {id} = params;
    const {
        newTitle: title, 
        newAmount: amount,
        newType: type,
        newCategory: category,
    } = await req.json();
    await connectMongoDB();
    await Transaction.findByIdAndUpdate(id, {title, amount, type, category})
    return NextResponse.json({message:"Transaction Updated!"}, {status: 200});
}


export async function GET(req, {params}){
    const {id} = params;
    await connectMongoDB();
    const transaction = await Transaction.findOne({_id: id});
    return NextResponse.json({transaction}, {status: 200});
}