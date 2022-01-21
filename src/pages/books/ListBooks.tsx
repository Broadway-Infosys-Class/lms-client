import { Table, Button, Modal, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import MainComponent from "../../components/MainComponent";
import TitleComponent from "../../components/TitleComponent";
import ButtonComponent from "../../components/ButtonComponent";

interface IBook {
  _id?: string;
  author: string;
  title: string;
}

const ListBooks = () => {
  const [books, setBooks] = useState([] as IBook[]);
  const [newBook, setNewBook] = useState({} as IBook);
  const [showModal, setShowModal] = useState(false as boolean);

  const getAllBooks = async () => {
    const response = await axios.get("http://localhost:4099/api/books");
    //console.log("===========",response.data); 
    setBooks(response.data.data);
  };

  const handleInputChange = (event: any) => {
    event.persist();
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    const response = newBook._id
      ? await axios.patch(
          `http://localhost:4099/api/books/${newBook._id}`,
          newBook
        )
      : await axios.post("http://localhost:4099/api/books", newBook);

    setShowModal(false);
    getAllBooks();
  };

  const handleBookEdit = async (id: string) => {
    console.log("Handle Book Edit");
    if (id.length < 1) {
      return;
    }
    const response = await axios.get(`http://localhost:4099/api/books/${id}`);
    setNewBook(response.data.data);
    setShowModal(true);
  };
  const handleCancel = () => {
    setNewBook({
      title: "",
      author: "",
    });
    setShowModal(false);
  };
  const handleBookDelete = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:4099/api/books/${id}`
    );
    getAllBooks();
  };

  const bookColumns = [
    { title: "Book Title",
    dataIndex: "title",
    key: "title" },
    {
      title: "Book Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Operations",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <div className="operation-wrapper">
          <Button onClick={() => {handleBookEdit(_id)}} type="primary">Edit</Button>
          {/* <ButtonComponent onClick={() => {handleBookEdit(_id);}} type="primary" btnText="Edit"/> */}
          <Button onClick={() => {handleBookDelete(_id)}} danger type="primary">Delete</Button>
          {/* <ButtonComponent onClick={() => {handleBookDelete(_id);}} danger type="primary" btnText="Delete"/> */}
        </div>
      ),
    },
  ];


 const handleClickAddButton = (event: any) => {
    event.persist();
    setShowModal(true);
  };



  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <MainComponent>
      <CustomBereadcrumb items={["Books"]} />
      {/* <div className="title-wrapper">
      <h3>Welcome to Book List</h3>
      <Button onClick={handleClickAddButton} type="primary">
        Add Book
      </Button>
      </div> this is copied to custombreadcrumbs and modified there so that component
      can be used in multiple pages and we dont have rewrite code every time we need to use that component*/}
      <TitleComponent title="Welcome to Book List" 
      addButton="Add Book"
      addBtnClickFunction={handleClickAddButton}/>
      <Table dataSource={books} columns={bookColumns} />
      <br />
      <Modal
        title={newBook._id ? "Edit Book" : "Add Book"}
        visible={showModal}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
      >
        
        <div className="modal-form">
          <Input onChange={handleInputChange}
            value={newBook.title}
            type="text"
            name="title"
            placeholder="Enter Book Name" 
           />
      
          <Input onChange={handleInputChange}
            value={newBook.author}
            type="text"
            name="author"
            placeholder="Enter Author Name" 
            />
        </div>
      </Modal>
    </MainComponent>
  );
};

export default ListBooks;
