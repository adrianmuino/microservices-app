import { Schema, model } from "mongoose";


interface Query {
    homerun: string;
    homerunId: string;
    stats: [{ stat: string, statId: string }];
}

const schema = new Schema<Query>({
    homerun: { type: String, required: true },
    homerunId: { type: String, required: true },
    stats: { type: [{ stat: String, statId: String }], required: true }
});

const QueryModel = model<Query>("Query", schema);

export default QueryModel;