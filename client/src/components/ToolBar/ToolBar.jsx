// ToolBar.jsx
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setMaterial,
  setPriceRange,
  setProductType,
  setSort,
} from "../../redux/actions";
import filter from "./../../imagenes/filter.png";
import style from "./ToolBar.module.css";

const ToolBar = () => {
  const location = useLocation();

  const productTypeList = useSelector((state) => state.productType);
  const materialList = useSelector((state) => state.materialState); // Nueva lista de materiales
  const productList = useSelector((state) => state.muebles);
  const coloresList = useSelector((state) => state.colorState);


  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Armado de opciones por tipo de producto

  const productTypeNames = productTypeList.map(
    (productType) => productType.name
  );

  const materialNames = materialList.map(
    // Obtener nombres de materiales
    (material) => material.name
  );

  const productPrices = productList.map((product) => product.price);

  const sortedProductPrices = productPrices.sort(function (a, b) {
    return a - b;
  });

  const chunkSize = Math.ceil(sortedProductPrices.length / 3);

  const cheapPrices = sortedProductPrices.slice(0, chunkSize);
  const middlePrices = sortedProductPrices.slice(chunkSize, 2 * chunkSize);
  const highPrices = sortedProductPrices.slice(2 * chunkSize);

  const dispatch = useDispatch();

  const setSortProductsHandler = (event) => {
    dispatch(setSort(event.target.value));
  };

  const setFilterByProductTypeHandler = (event) => {
    dispatch(setProductType(event.target.value));
  };

  const setFilterByColorHandler = (event) => {
    dispatch(setColor(event.target.value));
  };

  const setFilterByMaterialHandler = (event) => {
    // Nuevo handler para filtrar por material
    console.log(event.target.value);
    dispatch(setMaterial(event.target.value));
  };

  const setFilterByPriceHandler = (event) => {
    dispatch(setPriceRange(event.target.value));
  };
  return (
    <div className={style.cntnToolBar}>
      {location.pathname === "/home" && (
        <div className={style.container}>
          <div className={style.divSelect}>
            <Form.Select
              onChange={setFilterByProductTypeHandler}
              size="sm"
              className={style.select}
            >
              <option value="allProductTypes">Tipo de ambiente</option>
              {productTypeNames &&
                productTypeNames.map((productType, index) => {
                  return (
                    <option value={productType} key={index}>
                      {productType}
                    </option>
                  );
                })}
            </Form.Select>
          </div>
          <div className={style.filterIcon} onClick={toggleFilters}>
            <span>Filtrados</span>
            <img src={filter} alt="" className={style.filter} />
          </div>
          {showFilters && (
            <div className={style.filterOptions}>
              <div className={style.divSelect}>
                <Form.Select
                  size="sm"
                  onChange={setSortProductsHandler}
                  className={style.select}
                >
                  <option value="notSorted">Ordenar...</option>
                  <option value="MC">Mas caros</option>
                  <option value="MB">Mas baratos</option>
                  <option value="MV">Mayor Antiguedad</option>
                  <option value="MN">Menor Antiguedad</option>
                </Form.Select>
              </div>
              <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByProductTypeHandler}
                  size="sm"
                  className={style.select}
                >
                  <option value="allProductTypes">Tipo de ambiente</option>
                  {productTypeNames &&
                    productTypeNames.map((productType, index) => {
                      return (
                        <option value={productType} key={index}>
                          {productType}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
              <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByMaterialHandler}
                  size="sm"
                  className={style.select}
                >
                  <option value="allMaterials">Todos los Materiales</option>
                  {materialNames &&
                    materialNames.map((material, index) => {
                      return (
                        <option value={material} key={index}>
                          {material}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
              <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByPriceHandler}
                  size="sm"
                  className={style.select}
                >
                  <option value={[]}>Precios</option>
                  <option value={cheapPrices}>
                    Precios entre {cheapPrices[0]} y{" "}
                    {cheapPrices[cheapPrices.length - 1]}
                  </option>
                  <option value={middlePrices}>
                    Precios entre {middlePrices[0]} y{" "}
                    {middlePrices[middlePrices.length - 1]}
                  </option>
                  <option value={highPrices}>
                    Precios entre {highPrices[0]} y{" "}
                    {highPrices[highPrices.length - 1]}
                  </option>
                </Form.Select>
              </div>
              <div className={style.divSelect}>
                <Form.Select
                  size="sm"
                  onChange={setSortProductsHandler}
                  className={style.select}
                >
                  <option value="notSorted">Ordenar...</option>
                  <option value="DESC">Mas caros</option>
                  <option value="MB">Mas baratos</option>
                  {/* <option value="MV">Mayor Antiguedad</option>
                  <option value="MN">Menor Antiguedad</option> */}
                </Form.Select>
              </div>
              <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByColorHandler}
                  size="sm"
                  className={style.select}
                >
                  <option value="allColors">Todos los Colores</option>
                  {coloresList.map((color) => {
                    return (
                      <option value={color.id} key={color.id}>
                        {color.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className={style.divSelect}>
                <Form.Select
                  onChange={setFilterByPriceHandler}
                  size="sm"
                  className={style.select}
                >
                  <option value={[]}>Precios</option>
                  <option value={cheapPrices}>
                    Precios entre {cheapPrices[0]} y{" "}
                    {cheapPrices[cheapPrices.length - 1]}
                  </option>
                  <option value={middlePrices}>
                    Precios entre {middlePrices[0]} y{" "}
                    {middlePrices[middlePrices.length - 1]}
                  </option>
                  <option value={highPrices}>
                    Precios entre {highPrices[0]} y{" "}
                    {highPrices[highPrices.length - 1]}
                  </option>
                </Form.Select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default ToolBar;
