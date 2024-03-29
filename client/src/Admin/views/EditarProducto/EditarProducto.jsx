import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetail,
  putProduct,
  getColorById,
  getMaterialById,
  getProductTypeById,
} from "../../../redux/actions";
import style from "./EditarProducto.module.css";
import edit from "./../../../imagenes/edit.png";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import validation from "./validation";

const EditarProducto = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateDetail = useSelector((state) => state.detail); //trae todos los productos
  const stateProductType = useSelector((state) => state.productType);
  const stateColor = useSelector((state) => state.colorState); //trae todos los colores
  const stateMaterial = useSelector((state) => state.materialState);
  const colorById = useSelector((state) => state.colorById); //trae color por id
  const materialById = useSelector((state) => state.materialId);
  const productTypeById = useSelector((state) => state.tipoDeProductoById);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [modal, setModal] = useState(false);
  // console.log(stateDetail);
  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getColorById(stateDetail.colorId));
    dispatch(getMaterialById(stateDetail.materialId));
    dispatch(getProductTypeById(stateDetail.productTypeId));
  }, [getDetail, stateDetail]);

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setErrors(validation({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    dispatch(putProduct(id, form));
    setModal(true);
  };
  const handleAcept = () => {
    setModal(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const isAnImageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff)$/i;
    if (file && isAnImageRegex.test(file.name)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
        setForm({ ...form, imageBase64: reader.result });
      };
    } else {
      toast.error("No es un formato de imagen válido", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const handleResetClick = (event) => {
    event.preventDefault();
    setPreview(null);
    setImage(null);

    const inputFile = document.getElementById("hidden-input");
    if (inputFile) {
      inputFile.value = ""; // Esto borra la selección de archivo anterior
    }
  };

  const toggleEdit = () => {
    setShowFilters(!showFilters);
  };

  const handleSelectMuebles = (event) => {
    const property = event.target.name;
    let value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  return (
    <div className={style.cntnForm}>
      <p className={style.tittle}>Editar Producto</p>
      <Form className={style.formConteiner} onSubmit={submitHandler} noValidate>
        <div onClick={toggleEdit}>
          <img src={edit} alt="" className={style.edit} />
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Nombre:
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.name}
            </Form.Label>
            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo nombre:
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.name}
                  onChange={changeHandler}
                  size="sm"
                  type="text"
                  value={form.name}
                  name="name"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Precio:{" "}
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.price}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo precio:
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.price}
                  onChange={changeHandler}
                  size="sm"
                  type="text"
                  value={form.price}
                  name="price"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Altura:{" "}
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.height}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nueva altura:{" "}
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.height}
                  onChange={changeHandler}
                  size="sm"
                  type="text"
                  value={form.height}
                  name="height"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Profundidad
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.depth}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nueva profundidad:{" "}
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.depth}
                  onChange={changeHandler}
                  size="sm"
                  type="text"
                  value={form.depth}
                  name="depth"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Ancho:
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.width}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo ancho:{" "}
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.width}
                  onChange={changeHandler}
                  size="sm"
                  type="text"
                  value={form.width}
                  name="width"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Peso:
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.weight
                ? stateDetail.weight
                : stateDetail.weight}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo peso:{" "}
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.weight}
                  onChange={changeHandler}
                  size="sm"
                  type="text"
                  value={form.weight}
                  name="weight"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Stock:
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.stock}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nuevo stock:{" "}
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.stock}
                  onChange={changeHandler}
                  size="sm"
                  type="text"
                  value={form.stock}
                  name="stock"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Color:
            </Form.Label>
            {colorById.id === stateDetail.colorId ? (
              <Form.Label
                className={showFilters ? style.labelEdit : style.label}
              >
                {colorById.name}
              </Form.Label>
            ) : (
              <Form.Label className={style.label}>No disponible</Form.Label>
            )}

            {showFilters && (
              <div className={style.divinputErrorType}>
                <Form.Select
                  size="sm"
                  onChange={handleSelectMuebles}
                  value={form.color}
                  name="colorId"
                  className={style.select}
                >
                  <option>Seleccionar Nuevo Color</option>
                  {stateColor &&
                    stateColor.map((tipo, index) => {
                      return (
                        <option key={index} value={tipo.id} name={tipo.name}>
                          {tipo.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Material:
            </Form.Label>
            {materialById.id === stateDetail.materialId ? (
              <Form.Label
                className={showFilters ? style.labelEdit : style.label}
              >
                {materialById.name}
              </Form.Label>
            ) : (
              <Form.Label className={style.label}>No disponible</Form.Label>
            )}

            {showFilters && (
              <div className={style.divinputErrorType}>
                <Form.Select
                  size="sm"
                  onChange={handleSelectMuebles}
                  value={form.productType}
                  name="materialId"
                  className={style.select}
                >
                  <option>Seleccionar Nuevo Material</option>
                  {stateMaterial &&
                    stateMaterial.map((tipo, index) => {
                      return (
                        <option key={index} value={tipo.id} name={tipo.name}>
                          {tipo.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Tipo de Producto:
            </Form.Label>
            {productTypeById.id === stateDetail.productTypeId ? (
              <Form.Label
                className={showFilters ? style.labelEdit : style.label}
              >
                {productTypeById.name}
              </Form.Label>
            ) : (
              <Form.Label
                className={showFilters ? style.labelEdit : style.label}
              >
                No disponible
              </Form.Label>
            )}

            {showFilters && (
              <div className={style.divinputErrorType}>
                <Form.Select
                  size="sm"
                  onChange={handleSelectMuebles}
                  value={form.productType}
                  name="productTypeId"
                  className={style.select}
                >
                  <option>Seleccionar Nuevo Tipo de Producto</option>
                  {stateProductType &&
                    stateProductType.map((tipo, index) => {
                      return (
                        <option key={index} value={tipo.id} name={tipo.name}>
                          {tipo.name}
                        </option>
                      );
                    })}
                </Form.Select>
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              Descripcion:
            </Form.Label>
            <Form.Label className={showFilters ? style.labelEdit : style.label}>
              {stateDetail && stateDetail.description}
            </Form.Label>

            {showFilters && (
              <div className={style.divinputError}>
                <Form.Label className={style.label}>
                  Ingrese nueva descripcion:
                </Form.Label>
                <Form.Control
                  placeholder={stateDetail.description}
                  size="sm"
                  type="text"
                  value={form.description}
                  name="description"
                  className={style.input}
                />
                <Form.Text className={style.error}></Form.Text>
              </div>
            )}
          </Form.Group>
        </div>
        <div className={style.editContainer}>
          <Form.Group className={style.formGroup} controlId="formBasicEmail">
            <Form.Label
              className={showFilters ? style.labelEdit : style.labelImg}
            >
              Imagen:
            </Form.Label>
            <Container>
              <Row>
                <Col xs={8} md={3}>
                  <Form.Label
                    className={
                      showFilters ? style.labelImgEdit : style.labelImg
                    }
                  >
                    <Image src={stateDetail.imagePath} thumbnail />
                  </Form.Label>
                </Col>
              </Row>
            </Container>
            {showFilters && (
              <div className={style.divinputError}>
                <header>
                  <div className={style.tittleSelectImage}>
                    <span>Selecciona una imagen:</span>
                  </div>
                  <div className={style.inputSelectImage}>
                    <input
                      id="hidden-input"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <div>
                      {preview && (
                        <img
                          className={style.imageForm}
                          src={preview}
                          alt="preview"
                        />
                      )}
                    </div>
                  </div>
                </header>

                {loading ? (
                  <div>
                    <div></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  url && (
                    <div>
                      <img src={preview} alt="preview" />
                    </div>
                  )
                )}
              </div>
            )}
          </Form.Group>
        </div>
        <button className={style.botonReset} onClick={handleResetClick}>
          Reset
        </button>
        {showFilters &&
          (Object.values(errors).every((error) => error === "") ? (
            <button type="submit" className={style.botonSubmit}>
              Enviar
            </button>
          ) : (
            <button type="submit" className={style.botonSubmitOff}>
              Enviar
            </button>
          ))}
      </Form>
      <Modal show={modal}>
        <Modal.Header className={style.headerModal}>
          <Modal.Title>Producto Editado</Modal.Title>
        </Modal.Header>
        <Modal.Footer className={style.footerModal}>
          <Button onClick={handleAcept} className={style.buttonModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditarProducto;
