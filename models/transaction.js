import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema(
    {
        title: String,
        amount: Number,
        type: String,
        category: String,
        userId: String
    },
    {
        timeseries: true
    }
)

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;