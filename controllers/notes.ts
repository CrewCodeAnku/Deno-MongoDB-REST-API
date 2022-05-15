import { ObjectId } from "https://deno.land/x/mongo@v0.29.4/mod.ts";
import { getDb } from "../helpers/db.ts";
import { Notes } from "../interfaces/notes.ts";

export default {
  getAllNotes: async ({ response }: { response: any }) => {
    const notes = await getDb().collection("notes").find({}).toArray();
    response.status = 201;
    response.body = { message: "All Notes!", notes: notes };
  },
  createNotes: async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    const data = await request.body().value;
    const newNotes: Notes = {
      text: data.text,
    };

    await getDb().collection("notes").insertOne(newNotes);
    response.status = 201;
    response.body = { message: "Created notes!", todo: newNotes };
  },
  getById: async ({
    params,
    response,
  }: {
    params: { noteId: string };
    response: any;
  }) => {
    const tid = params.noteId!;
    const notes = await getDb()
      .collection("notes")
      .findOne({ _id: new ObjectId(tid) });
    response.status = 201;
    response.body = { message: "New notes!", notes: notes };
  },
  updateNoteById: async ({
    params,
    request,
    response,
  }: {
    params: { noteId: string };
    request: any;
    response: any;
  }) => {
    const tid = params.noteId!;
    const data = await request.body().value;

    const notes = await getDb()
      .collection("notes")
      .updateOne({ _id: new ObjectId(tid) }, { $set: { text: data.text } });
    response.status = 201;
    response.body = { message: "Updated notes", notes: notes };
  },
  deleteNoteById: async ({
    params,
    response,
  }: {
    params: { noteId: string };
    response: any;
  }) => {
    const tid = params.noteId!;

    const notes = await getDb()
      .collection("notes")
      .deleteOne({ _id: new ObjectId(tid) });

    response.status = 201;
    response.body = { message: "Deleted notes", notes: notes };
  },
};
