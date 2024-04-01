import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Transaction from "../../../models/transaction";

export async function POST(req) {
    const { title, amount, type, category, userId } = await req.json();
    await connectMongoDB();
    await Transaction.create({ title, amount, type, category, userId });
    return NextResponse.json({message: "Transaction Created!"}, {status: 201});
}

export async function GET(){
    await connectMongoDB();
    const transactions = await Transaction.find();
    return NextResponse.json({transactions});
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({message:"Transaction Deleted!"}, {status: 201});
}