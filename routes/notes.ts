import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();

import notesController from "../controllers/notes.ts";

router.get("/notes", notesController.getAllNotes);

router.post("/notes", notesController.createNotes);

router.put("/notes/:noteId", notesController.updateNoteById);

router.get("/notes/:noteId", notesController.getById);

router.delete("/notes/:noteId", notesController.deleteNoteById);

export default router;
