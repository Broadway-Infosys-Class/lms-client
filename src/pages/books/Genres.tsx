import React, { useEffect, useState } from "react";
import MainComponent from "../../components/MainComponent";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import TitleComponent from "../../components/TitleComponent";
import { Table, Button, Modal, Input, Select } from "antd";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent";
const { Option } = Select;

interface IGenres {
  _id: string;
   genre: string;
}
const Genres = () => {
  const [genres, setGenres] = useState([] as IGenres[]);
  const [newGenre, setnewGenre] = useState({} as IGenres);
  const [showModal, setShowModal] = useState(false as boolean);

  const getAllGenres = async () => {
    const response = await axios.get("http://localhost:4099/api/genre");
    setGenres(response.data.data);
  };

  const handleFormSubmit = async () => {
    const response = newGenre._id
      ? await axios.patch(
          `http://localhost:4099/api/genre/${newGenre._id}`,
          newGenre
        )
      : await axios.post("http://localhost:4099/api/genre", newGenre);

    setShowModal(false);
    getAllGenres();
  };

  const handleCancel = () => {
    setnewGenre({
      _id: "",
       genre: "",
    });
    setShowModal(false);
  };

  const handleGenreEdit = async (id: string) => {
    const response = await axios.get(`http://localhost:4099/api/genre/${id}`);
    setnewGenre(response.data.data);
    setShowModal(true);
  };

  const genresColumns = [
   {
     title: "Genre", dataIndex: "genre" , key: "genre"   
   },
    {
      title: "Operations",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <div className="operation-wrapper">
          <ButtonComponent
            onClick={() => {
              handleGenreEdit(_id);
            }}
            type="primary"
            btnText="Edit"
          />

          <ButtonComponent
            onClick={() => {
              handleGenreDelete(_id);
            }}
            danger
            type="primary"
            btnText="Delete"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllGenres();
  }, []);

  const handleClickAddButton = (event: any) => {
    event.persist();
    setShowModal(true);
  };

  const handleChange = (event: any) => {
    event.persist();
    setnewGenre({
      ...newGenre,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenreDelete = async (id: string) => {
    const resposne = await axios.delete(
      `http://localhost:4099/api/genre/${id}`
    );
    getAllGenres();
  };

  return (
    <>
      <MainComponent>
        <CustomBereadcrumb items={["Genres"]} />
        <TitleComponent
          title="Genre List"
          addButton="Add Genre"
          addBtnClickFunction={handleClickAddButton}
        />
        <Table dataSource={genres} columns={genresColumns} />
      </MainComponent>

      <Modal
        title="Add Book Genre"
        visible={showModal}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
      >
        <label>Genre:</label>
        <Input
          name="genre"
          onChange={handleChange}
          placeholder="input your Genre"
          value={newGenre.genre}
        />
      </Modal>
    </>
  );
};

export default Genres;
