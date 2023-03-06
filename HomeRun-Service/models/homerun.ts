import { Schema, model } from "mongoose";

interface HomeRun {
    player: string;
    homerunId: string;
}

const schema = new Schema<HomeRun>({
    player: { type: String, required: true },
    homerunId: { type: String, required: true }
});

const HomeRunModel = model<HomeRun>("HomeRun", schema);

export default HomeRunModel;