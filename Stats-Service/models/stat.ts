import { Schema, model } from "mongoose";


interface Stat {
    homerunId: string;
    stats: [{ stat: string, statId: string }];
}

const schema = new Schema<Stat>({
    homerunId: { type: String, required: true },
    stats: [{ stat: String, statId: String }]
});

const StatModel = model<Stat>("Stat", schema);

export default StatModel;