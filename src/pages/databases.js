import React, { useState, useEffect } from "react";
import db from "../database/db";
import uid from "uid";

const electron = window.require("electron").remote;
const { dialog } = electron;
const moment = require("moment");

export const databasesPages = () => {
  const [todos, setTodos] = useState(null);
  const [titleForm, setTitleForm] = useState("");
  const [descForm, setDescForm] = useState("");

  useEffect(() => {
    ambilData();
    return () => ({});
  }, []);

  const clearData = () => {
    setTitleForm("");
    setDescForm("");
  };

  const ambilData = async () => {
    const table = db.table("todos");
    const data = await table
      .reverse()
      .toArray()
      .then((todos) => {
        return todos;
      });

    createView(data);
  };

  const createView = (data) => {
    let view = [];
    data.forEach((value) => {
      view.push(
        <div key={value.uid}>
          <h2>{value.title}</h2>
          <p>{value.description}</p>
        </div>
      );
    });
    setTodos(view);
  };

  const postSubmit = async (e) => {
    e.preventDefault();

    if (titleForm === "" || descForm === "") {
      dialog.showMessageBox(null, {
        type: "error",
        title: "Pesan Kesalahan",
        message: "Belum memasukkan data !",
        detail: "Pastikan masukkan judul dan deskripsi telah di isi !",
      });
    } else {
      const todo = {
        uid: uid(),
        title: titleForm,
        description: descForm,
        created_at: moment().format(),
        updated_at: moment().format(),
      };

      const kirim = await db
        .table("todos")
        .add(todo)
        .then((res) => ({
          payload: res,
          status: "sukses",
        }))
        .catch((err) => ({
          payload: err,
          status: "gagal",
        }));

      if (kirim.status === "sukses") {
        dialog.showMessageBox(null, {
          type: "info",
          title: "Informasi",
          message: "Data berhasil disimpan",
          detail: "Data yang anda masukkan telah disimpan",
        });
        clearData();
        ambilData();
      } else {
        dialog.showMessageBox(null, {
          type: "error",
          title: "Pesan Kesalahan",
          message: "Terjadi kesalahan pada aplikasi klien",
          detail: kirim.payload,
        });
      }
    }
  };

  return (
    <div>
      <div id="header">TODO List</div>
      <div id="form">
        <form onSubmit={postSubmit}>
          <label>
            Judul :
            <input
              name="title"
              type="text"
              value={titleForm}
              onChange={(e) => setTitleForm(e.target.value)}
            />
          </label>

          <label>
            Deskripsi :
            <input
              name="description"
              type="text"
              value={descForm}
              onChange={(e) => setDescForm(e.target.value)}
            />
          </label>
          <button type="submit">Tambah</button>
        </form>
      </div>
      <div id="content">{todos}</div>
    </div>
  );
};

export default databasesPages;
