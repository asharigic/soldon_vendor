import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Modal,
  UncontrolledTooltip
} from "reactstrap";
import Spinners from '../../../components/Common/Spinner';
import Select from "react-select";
import { getTagDropDownList, addNewTag } from '../../../store/master/tags/actions';
import { addNewCategory, getCategoryDropDownList } from '../../../store/master/categories/actions';
import { addNewTerm, getTermDropDownList } from '../../../store/master/terms/actions';
import * as Yup from "yup";
import * as yup from "yup";
import { useFormik } from "formik";
import { addNewProduct } from "../../../store/vendor/products/actions";
//Import Breadcrumb
import { useDispatch, useSelector } from 'react-redux';

import CommonModal from "../../../components/Common/CommonModal";
import { getAttributeDropDown } from "../../../store/master/attributes/actions";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProduct = () => {
  //meta title
  document.title = "Add Product | Quench";
  const [selectedStatus, setSelectedStatus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector
  const { tags, loading, successtag } = useSelector((state) => state.tags);
  const { error, successproduct, productloading } = useSelector((state) => state.products);
  const { categories, successcategory } = useSelector((state) => state.categories);
  const { attributes } = useSelector((state) => state.attributes);
  const { terms, successterm, termloading } = useSelector((state) => state.terms);

  const [productimage, setproductimage] = useState(null);
  const [productgallery, setProductGallery] = useState([]);
  const [modal1, setModal1] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);
  const [isTermTextVisible, setIsTermTextVisible] = useState(false);
  const [TermText, setTermText] = useState('');

  // Model
  const [isTagModal, setIsTagModal] = useState(false);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isTermModal, setIsTermModal] = useState(false);


  const [selectedStatusId, setSelectedStatusId] = useState('');
  const [selectedsealed, setselectedsealed] = useState(null);
  const [selectedsealedId, setselectedsealedId] = useState('');
  const [productcondition, setProductcondition] = useState('new');
  const [productgrade, setProductgrade] = useState('gradeA');
  const [editorContent, setEditorContent] = useState('');
  const [selectedstock, setSelectedStock] = useState(null);
  const [selectedStockId, setSelectedStockId] = useState('');

  const [selectedtag, setSelectedTag] = useState(null);
  const [selectedTagId, setSelectedTagId] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryModel, setSelectedCategoryModel] = useState(null);

  const [selectedterm, setSelectedTerm] = useState(null);
  const [selectedtermId, setSelectedTermId] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedAttributeId, setSelectedAttributeId] = useState('');

  const toggleModal1 = () => setModal1(!modal1);

  useEffect(() => {
    if ((tags && !tags.length) || successtag) {
      dispatch(getTagDropDownList());
    }
  }, [dispatch, successtag]);

  useEffect(() => {
    if ((categories && !categories.length) || successcategory) {
      dispatch(getCategoryDropDownList());
    }
  }, [dispatch, successcategory]);

  useEffect(() => {
    if (attributes && !attributes.length) {
      dispatch(getAttributeDropDown());
    }
  }, [dispatch]);

  useEffect(() => {
    if ((terms && !terms.length) || successterm) {
      dispatch(getTermDropDownList());
    }
  }, [dispatch, successterm]);

  const statusType = [
    { value: 'pending', label: 'Pending' },
    { value: 'published', label: 'Published' },
    { value: 'approved', label: 'Approved' },
    { value: 'draft', label: 'Draft' },
    { value: 'expired', label: 'Expired' },
  ];

  const sealedType = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const stockType = [
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out Of Stock' },
  ];

  const productconditionoptions = [
    { value: "new", label: "New" },
    { value: "unused", label: "Unused" },
    { value: "na", label: "N/A" }
  ];

  const productgradeOptions = [
    { value: "gradeA", label: "Grade A" },
    { value: "gradeB", label: "Grade B" },
    { value: "gradeC", label: "Grade C" },
    { value: "none", label: "None" },
    { value: "na", label: "N/A" }
  ];

  const handleSelectStatus = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setSelectedStatusId(selectedOption ? selectedOption.value : ''); // Update selectedStatusId
    metaData.setFieldValue('status', selectedOption ? selectedOption.value : '');

    if (selectedOption && selectedOption.value) {
      metaData.setFieldError('status', undefined); // Clear any validation error
    }
  };

  const handleSelectsealed = (selectedOption) => {
    setselectedsealed(selectedOption);
    setselectedsealedId(selectedOption ? selectedOption.value : ''); // Update selectedStatusId
    metaData.setFieldValue('sealed', selectedOption ? selectedOption.value : '');

    if (selectedOption && selectedOption.value) {
      metaData.setFieldError('sealed', undefined); // Clear any validation error
    }
  };

  const handleSelectTag = (selectedOption) => {
    setSelectedTag(selectedOption);
    const selectedTagIds = selectedOption ? selectedOption.map(option => option.value) : [];
    setSelectedTagId(selectedTagIds);

    metaData.setFieldValue('tags_id', selectedTagIds);
    if (selectedOption && selectedOption.value) {
      metaData.setFieldError('tags_id', undefined); // Clear any validation error
    }
  };

  const handleSelectCategory = (selectedOption) => {
    setSelectedCategory(selectedOption);
    const selectedcategoryId = selectedOption ? selectedOption.map(option => option.value) : [];
    setSelectedCategoryId(selectedcategoryId);

    metaData.setFieldValue('category_id', selectedcategoryId);
    if (selectedOption && selectedOption.value) {
      metaData.setFieldError('category_id', undefined); // Clear any validation error
    }
  };

  const handleSelectCategoryModel = (selectedOption) => {
    setSelectedCategoryModel(selectedOption);
    validationTypeCategory.setFieldValue('parent_id', selectedOption ? selectedOption.value : '');

    if (selectedOption && selectedOption.value) {
      validationTypeCategory.setFieldError('parent_id', undefined); // Clear any validation error
    }
  };

  const handleSelectTerm = (selectedOption) => {
    setSelectedTerm(selectedOption);
    const selectedcategoryId = selectedOption ? selectedOption.map(option => option.value) : [];
    setSelectedTermId(selectedcategoryId);

    metaData.setFieldValue('term_id', selectedcategoryId);
    if (selectedOption && selectedOption.value) {
      metaData.setFieldError('term_id', undefined); // Clear any validation error
    }
  };

  const handleSelectAttribute = (selectedOption) => {
    setSelectedAttribute(selectedOption);
    setSelectedAttributeId(selectedOption ? selectedOption.value : ''); // Update selectedAttributeId
    validationTypeTerm.setFieldValue('attribute_id', selectedOption ? selectedOption.value : '');

    if (selectedOption && selectedOption.value) {
      validationTypeTerm.setFieldError('attribute_id', undefined); // Clear any validation error
    }
  };

  const handleSelectStock = (selectedOption) => {
    setSelectedStock(selectedOption);
    setSelectedStockId(selectedOption ? selectedOption.value : ''); // Update selectedStatusId
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data); // Update local state for CKEditor
    metaData.setFieldValue('description', data); // Update Formik content value
  };

  const handleEditorBlur = () => {
    metaData.setFieldTouched('description', true); // Mark content as touched
  };
  //Meta Data
  const metaData = useFormik({
    initialValues: {
      productname: '',
      subtitle: "",
      price: '',
      description: '',
      status: "",
      image: "",
      manufacturer: "",
      model: "",
      variation: "",
      ean: "",
      upc: "",
      sealed: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      tags_id: "",
      category_id: "",
      term_id: "",
      stock_status: "",
      images: "",
      additional_condition: ''
    },
    validationSchema: yup.object().shape({
      productname: yup.string().required('Please Enter Your Product Name'),
      price: yup.string().required('Please Enter Price'),
      description: yup.string().required('Please Enter Description'),
      status: yup.string().required('Please Select Status'),
      sealed: yup.string().required('Please Select Sealed'),
      tags_id: yup.array().of(yup.string()).required("Please Select Products Tags"),
      category_id: yup.array().of(yup.string()).required("Please Select Products Category"),
      term_id: yup.array().of(yup.string()).required("Please Select Products Term"),
    }),
    onSubmit: (values) => {
      const images = productgallery
        ? productgallery.map(element => {
          // Split the base64 string at the first comma and return the second part
          const base64Data = element.split(',')[1];
          return base64Data;  // this will return just the base64-encoded data
        })
        : [];

      const product = {
        "product": {
          "productname": values.productname,
          "subtitle": values.subtitle ? values.subtitle : "",
          "price": values.price,
          "description": editorContent,
          "status": values.status = selectedStatusId,
          "stock_status": values.stock_status = selectedStockId ? selectedStockId : "",
          "image": productimage ? productimage.split(',')[1] : ""
        },
        "info": {
          "productcondition": productcondition,
          "sealed": selectedsealedId,
          "packaging_condition": productgrade,
          "manufacturer": values.manufacturer ? values.manufacturer : "",
          "model": values.model ? values.model : "",
          "variation": values.variation ? values.variation : "",
          "ean": values.ean ? values.ean : "",
          "upc": values.upc ? values.upc : "",
          "weight": values.weight ? values.weight : "",
          "length": values.length ? values.length : "",
          "width": values.width ? values.width : "",
          "height": values.height ? values.height : "",
          "additional_condition": values.additional_condition ? values.additional_condition : ''
        },
        "images": values.images = images ? images : "",
        "tags": {
          ids: selectedTagId ? selectedTagId : '',
        },
        "categories": {
          "ids": selectedCategoryId ? selectedCategoryId : '',
        },
        "terms": {
          "ids": selectedtermId ? selectedtermId : '',
        }
      }

      dispatch(addNewProduct(product));
      toggleModal1();
    },
  });

  //handleBase64 Images
  const handleAcceptedProductImage = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = () => {
      var logo = fileReader.result
      setproductimage(logo);
    }
  };

  //product gallery fetch
  const onproductGallery = (e) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = () => {
      var logo = fileReader.result
      setProductGallery([...productgallery, logo]);

    }
  };

  let removeImageproduct = (i) => {
    let values = [...productgallery];
    values.splice(i, 1);
    setProductGallery(values)
  };

  const handleproductconditionChange = (event) => {
    setProductcondition(event.target.value); // Update the selected value
  };

  const handleproductgradeChange = (event) => {
    setProductgrade(event.target.value); // Update the selected value
  };


  // Tag Form validation 
  const validationType = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        "Please Enter Name"
      )
    }),
    onSubmit: (values) => {
      dispatch(addNewTag(values));
      setIsTagModal(false);
    }
  });

  // Category Form validation 
  const validationTypeCategory = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      parent_id: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please Enter Name"),
    }),
    onSubmit: (values) => {
      dispatch(addNewCategory(values));
      setIsCategoryModal(false);
    }
  });

  // Term Form validation 
  const validationTypeTerm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      attribute_id: '', // Dynamically set initial value
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        "Please Enter Term Name"
      ),
      attribute_id: Yup.string().required(
        "Please Select Attribute"
      ),
    }),
    onSubmit: (values) => {
      values.attribute_id = selectedAttributeId;
      dispatch(addNewTerm(values));
      setIsTermModal(false);
    }
  });

  return (
    <Fragment>
      <div className="container">

        <h1 className="heading">Add Product</h1>
        <Row>
          <Col xl={12}>
            {productloading ? <Spinners setLoading={setIsLoading} />
              :
              <Card>
                <CardBody>
                  <Form onSubmit={metaData.handleSubmit} autoComplete="off">
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="productname">Product Name <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            placeholder="Product Name"
                            value={metaData.values.productname}
                            onChange={metaData.handleChange}
                            invalid={
                              metaData.touched.productname && metaData.errors.productname ? true : false
                            }
                          />
                          {metaData.errors.productname && metaData.touched.productname ? (
                            <FormFeedback type="invalid">{metaData.errors.productname}</FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="price">Price <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Price"
                            value={metaData.values.price}
                            onChange={metaData.handleChange}
                            invalid={
                              metaData.touched.price && metaData.errors.price ? true : false
                            }
                          />
                          {metaData.errors.price && metaData.touched.price ? (
                            <FormFeedback type="invalid">{metaData.errors.price}</FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Status <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <Select
                            name="status"
                            options={statusType}
                            value={selectedStatus ? selectedStatus : ""}
                            placeholder="Select Status"
                            onChange={(selectedOption) => handleSelectStatus(selectedOption)}
                            classNamePrefix="react-select"
                            className={`select2 ${metaData.touched.status && metaData.errors.status ? 'is-invalid' : ''}`} />
                          {metaData.errors.status && metaData.touched.status ? (
                            <span className="text-danger">{metaData.errors.status}</span>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Product Image</Label>

                          <div className="text-center">


                            <Input className="form-control"
                              id="formFileLg"
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={handleAcceptedProductImage} />



                            <div className="avatar-lg">
                              <div className="avatar-title bg-light rounded-circle">
                                <img src={productimage || ''} id="productimage" alt="" className="avatar-md h-auto rounded-circle" width={50} />
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Product Categories <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <Select
                            name="category_id"
                            value={selectedCategory}
                            placeholder="Select Product Categories"
                            options={categories?.categories && categories?.categories?.map(attr => ({
                              value: attr.id,
                              label: attr.name
                            }))}
                            isMulti
                            onChange={(selectedOption) => handleSelectCategory(selectedOption)}
                            className={`select2-selection ${metaData.touched.category_id && metaData.errors.category_id ? 'is-invalid' : ''}`} />
                          {metaData.errors.category_id && metaData.touched.category_id ? (
                            <span className="text-danger">{metaData.errors.category_id}</span>
                          ) : null}
                          <Link className="mt-2 d-block" to="#" onClick={() => setIsCategoryModal(true)}>+ Add New Category</Link>
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Product Tags <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <Select
                            name="tags_id"
                            value={selectedtag}
                            placeholder="Select Product Tags"
                            options={tags?.tags && tags?.tags?.map(attr => ({
                              value: attr.id,
                              label: attr.name
                            }))}
                            onChange={(selectedOption) => handleSelectTag(selectedOption)}
                            isMulti
                            className={`select2-selection ${metaData.touched.tags_id && metaData.errors.tags_id ? 'is-invalid' : ''}`} />
                          {metaData.errors.tags_id && metaData.touched.tags_id ? (
                            <span className="text-danger">{metaData.errors.tags_id}</span>
                          ) : null}
                          <Link className="mt-2 d-block" to="#" onClick={() => setIsTagModal(true)}>+ Add New Tag</Link>
                        </div>


                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="metatitle">Sub Title</Label>
                          <Input
                            id="metatitle"
                            name="subtitle"
                            type="text"
                            placeholder="Sub Title"
                            value={metaData.values.subtitle}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">

                          <Label htmlFor="description">
                            Product Description <span className="errorsymbol" style={{color: "red"}}>*</span>
                          </Label>
                          <Col lg="12">
                            <CKEditor
                              editor={ClassicEditor}
                              config={{

                                licenseKey: 'yb9cohmfnwpo4zlbubfkoeyzgj99jhzjo4gp5yie0ribr5y9',
                              }
                              }
                              data={metaData.values.description}
                              onChange={handleEditorChange} // Update Formik's content field
                              onBlur={handleEditorBlur} // Formik onBlur for validation
                            />

                            {metaData.errors.description && metaData.touched.description ? (
                              <span className="text-danger">{metaData.errors.description}</span>
                            ) : null}
                          </Col>

                        </div>
                        <div className="mb-3">
                          <div>
                            <Label htmlFor="formFileLg" className="form-label">Product Gallery</Label>
                            {productgallery.length > 0 &&
                              productgallery.map((item, index) => {
                                return (
                                  <div key={item}>
                                    <img src={item} alt="" height={100} width={100} />
                                    <button type="button" className="button remove mt-3 p-2" onClick={() => removeImageproduct(index)}>Remove</button>
                                  </div>
                                );
                              })}
                            <Input className="form-control" id="formFileLg" type="file" accept="image/png, image/jpeg" onChange={onproductGallery} />
                          </div>
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Product Term <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <Select
                            name="term_id"
                            value={selectedterm}
                            placeholder="Select Product Term"
                            options={terms?.terms && terms?.terms?.map(attr => ({
                              value: attr.id,
                              label: attr.name
                            }))}
                            isMulti
                            onChange={(selectedOption) => handleSelectTerm(selectedOption)}
                            className={`select2-selection ${metaData.touched.term_id && metaData.errors.term_id ? 'is-invalid' : ''}`} />
                          <Link className="mt-2 d-block" to="#" onClick={() => setIsTermModal(true)}>+ Add New Term</Link>
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Stock Status</Label>
                          <Select
                            name="stock_status"
                            options={stockType}
                            value={selectedstock}
                            onChange={(selectedOption) => handleSelectStock(selectedOption)}
                            classNamePrefix="select2"
                            placeholder="Select Stock Status"
                          />
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="metatitle">Additional Condition</Label>
                          <Input
                            id="metatitle"
                            name="additional_condition"
                            type="text"
                            placeholder="Additional Condition"
                            value={metaData.values.additional_condition}
                            onChange={metaData.handleChange}
                          />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="packagingcondition">Product Condition <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <div className="productradiobutton d-flex" >
                            {productconditionoptions.map((option) => (
                              <div key={option.value} className="form-check form-check-left mb-3" style={{paddingRight: "20px"}}>
                                <input
                                  type="radio"
                                  id={`productCondition_${option.value}`}  // Unique id for this group
                                  name="productCondition"
                                  value={option.value}
                                  className="form-check-input"
                                  checked={productcondition === option.value}
                                  onClick={handleproductconditionChange}
                                />
                                <label className="form-check-label" htmlFor={`productCondition_${option.value}`}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metatitle">Packaging Condition Grade <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <div className="productradiobutton d-flex">
                            {productgradeOptions.map((option) => (
                              <div key={option.value} className="form-check form-check-left mb-3" style={{paddingRight: "20px"}}>
                                <input
                                  type="radio"
                                  id={`productGrade_${option.value}`}  // Unique id for this group
                                  name="productGrade"
                                  value={option.value}
                                  className="form-check-input"
                                  checked={productgrade === option.value}
                                  onClick={handleproductgradeChange}
                                />
                                <label className="form-check-label" htmlFor={`productGrade_${option.value}`}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metaDescription">Model
                          </Label>
                          <Input
                            name="model"
                            id="model"
                            type="text"
                            placeholder="Model"
                            value={metaData.values.model}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metaDescription">EAN
                          </Label>
                          <Input
                            name="ean"
                            id="ean"
                            type="text"
                            placeholder="ean"
                            value={metaData.values.ean}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metatitle">Weight (kg)</Label>
                          <Input
                            id="metatitle"
                            name="weight"
                            type="number"
                            placeholder="Weight"
                            value={metaData.values.weight}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metatitle">Length </Label>
                          <Input
                            id="metatitle"
                            name="length"
                            type="number"
                            placeholder="length"
                            value={metaData.values.length}
                            onChange={metaData.handleChange}
                          />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label className="control-label">Sealed <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                          <Select
                            name="sealed"
                            options={sealedType}
                            value={selectedsealed}
                            placeholder="Select Sealed"
                            onChange={(selectedOption) => handleSelectsealed(selectedOption)}
                            classNamePrefix="react-select"
                            className={`select2 ${metaData.touched.sealed && metaData.errors.sealed ? 'is-invalid' : ''}`} />
                          {metaData.errors.sealed && metaData.touched.sealed ? (
                            <span className="text-danger">{metaData.errors.sealed}</span>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metakeywords">Manufacturer</Label>
                          <Input
                            id="metakeywords"
                            name="manufacturer"
                            type="text"
                            placeholder="Manufacturer"
                            value={metaData.values.manufacturer}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metaDescription">Variation
                          </Label>
                          <Input
                            name="variation"
                            id="variation"
                            type="text"
                            placeholder="Variation"
                            value={metaData.values.variation}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metaDescription">UPC
                          </Label>
                          <Input
                            name="upc"
                            id="upc"
                            type="text"
                            placeholder="upc"
                            value={metaData.values.upc}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metatitle">Width </Label>
                          <Input
                            id="metatitle"
                            name="width"
                            type="number"
                            placeholder="width"
                            value={metaData.values.width}
                            onChange={metaData.handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="metatitle">Height </Label>
                          <Input
                            id="metatitle"
                            name="height"
                            type="number"
                            placeholder="height"
                            value={metaData.values.height}
                            onChange={metaData.handleChange}
                          />
                        </div>
                      </Col>
                      <div className="d-flex flex-wrap gap-2">
                        <Button type="submit" color="primary"> Save  </Button>
                        <Button type="button" color="secondary" onClick={() => navigate("/selling-list")}> Cancel</Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            }
          </Col>
        </Row>

      </div>

      {!productloading &&
        < CommonModal
          isOpen={modal1}
          toggle={toggleModal1}
          title={successproduct ? "Success" : "Alert"}
          message={successproduct ? "Product Added Successfully." : error}
          redirectTo={successproduct ? "/selling-list" : toggleModal1} // Different navigation for this page
          buttonText="Okay"
        />
      }

      {/* Add Tag Model  */}
      {isTagModal === true &&
        <Modal isOpen={isTagModal}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Tag</h5>
            <button type="button"
              onClick={() => {
                setIsTagModal(false);
              }} className="btn-close"></button>
          </div>
          <Form onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}>
            <div className="modal-body">
              <div className="mb-3">
                <Label className="form-label">Name <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                <Input
                  name="name"
                  placeholder="Enter Name"
                  type="text"
                  onChange={validationType.handleChange}
                  onBlur={validationType.handleBlur}
                  value={validationType.values.name || ""}
                  invalid={
                    validationType.touched.name && validationType.errors.name ? true : false
                  }
                />
                {validationType.touched.name && validationType.errors.name ? (
                  <FormFeedback type="invalid">{validationType.errors.name}</FormFeedback>
                ) : null}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsTagModal(false)}>Close</button>
              <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
          </Form>
        </Modal>
      }

      {/* Add Category Model */}
      {isCategoryModal === true &&
        <Modal isOpen={isCategoryModal}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Category</h5>
            <button type="button"
              onClick={() => {
                setIsCategoryModal(false);
              }} className="btn-close"></button>
          </div>
          <Form onSubmit={(e) => {
            e.preventDefault();
            validationTypeCategory.handleSubmit();
            return false;
          }}>
            <div className="modal-body">
              <div className="mb-3">
                <Label className="form-label">Name <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                <Input
                  name="name"
                  placeholder="Enter Name"
                  type="text"
                  onChange={validationTypeCategory.handleChange}
                  onBlur={validationTypeCategory.handleBlur}
                  value={validationTypeCategory.values.name || ""}
                  invalid={
                    validationTypeCategory.touched.name && validationTypeCategory.errors.name ? true : false
                  }
                />
                {validationTypeCategory.touched.name && validationTypeCategory.errors.name ? (
                  <FormFeedback type="invalid">{validationTypeCategory.errors.name}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Select Category</Label>
                <Select
                  name="parent_id"
                  value={selectedCategoryModel}
                  onChange={(selectedOption) => handleSelectCategoryModel(selectedOption)}
                  options={categories?.categories && categories?.categories.map(category => ({
                    value: category.id,
                    label: category.name
                  }))}
                  classNamePrefix="react-select"
                  className={`select2-selection ${validationTypeCategory.touched.parent_id && validationTypeCategory.errors.parent_id ? 'is-invalid' : ''}`}
                  placeholder="Select Parent Category"  // Set the placeholder text
                />
                {validationTypeCategory.touched.parent_id && validationTypeCategory.errors.parent_id && (
                  <FormFeedback type="invalid">{validationTypeCategory.errors.parent_id}</FormFeedback>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsCategoryModal(false)}>Close</button>
              <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
          </Form>
        </Modal>
      }

      {/* Add Term Model */}
      {isTermModal === true &&
        <Modal isOpen={isTermModal}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Term</h5>
            <button type="button"
              onClick={() => {
                setIsTermModal(false);
              }} className="btn-close"></button>
          </div>
          <Form onSubmit={(e) => {
            e.preventDefault();
            validationTypeTerm.handleSubmit();
            return false;
          }}>
            <div className="modal-body">
              <div className="mb-3">
                <Label className="form-label">Term Name <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                <Input
                  name="name"
                  placeholder="Type Term Name"
                  type="text"
                  onChange={validationTypeTerm.handleChange}
                  onBlur={validationTypeTerm.handleBlur}
                  value={validationTypeTerm.values.name || ""}
                  invalid={
                    validationTypeTerm.touched.name && validationTypeTerm.errors.name ? true : false
                  }
                />
                {validationTypeTerm.touched.name && validationTypeTerm.errors.name ? (
                  <FormFeedback type="invalid">{validationTypeTerm.errors.name}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Select Attribute <span className="errorsymbol" style={{color: "red"}}>*</span></Label>
                <Select
                  name="attribute_id"
                  value={selectedAttribute}
                  onChange={(selectedOption) => handleSelectAttribute(selectedOption)}
                  options={attributes?.attributes && attributes?.attributes?.map(attr => ({
                    value: attr.id,
                    label: attr.name
                  }))}
                  classNamePrefix="react-select"
                  className={`select2-selection ${validationTypeTerm.touched.attribute_id && validationTypeTerm.errors.attribute_id ? 'is-invalid' : ''}`} // Add 'is-invalid' if there's an error
                  placeholder="Select Attribute"
                />
                {validationTypeTerm.touched.attribute_id && validationTypeTerm.errors.attribute_id && (
                  <FormFeedback type="invalid">{validationTypeTerm.errors.attribute_id}</FormFeedback>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsTermModal(false)}>Close</button>
              <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
          </Form>
        </Modal>
      }
    </Fragment>
  )
};

export default AddProduct;