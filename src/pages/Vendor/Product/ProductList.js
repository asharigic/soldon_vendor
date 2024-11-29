import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Spinners from '../../../components/Common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList } from '../../../store/vendor/products/actions';
import { Table } from 'react-bootstrap';
import bgimg1 from '../../../assets/images/no-img.jpg';
import { Link } from 'react-router-dom';
const ProductList = () => {
    document.title = "Products | Quench";
    const { products, pagination, productloading, successproduct, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getProductsList());
    }, []);
    if (isLoading || productloading) {
        return <Spinners setLoading={setIsLoading} />;  // Display loading state while data is being fetched
    };
    return (
        <>
            <div>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Subtile</th>
                            <th>Product Price</th>
                            <th>Product Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    {isLoading ? <Spinners setLoading={setIsLoading} />
                        :
                        <tbody>
                            {
                                products?.data.map((element,index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td><img src={element.image ? element.image :bgimg1} width={50}/></td>
                                            <td>{element.productname ? element.productname :"_"}</td>
                                            <td>{element.subtitle ? element.subtitle :"_"}</td>
                                            <td>{element.price ? element.price :"_"}</td>
                                            <td>{element.status ? element.status :"_"}</td>
                                            <td> <Link to={`/edit-product/${element.id}`} style={{ cursor: 'default' }}>Edit</Link> <Link to="#" style={{ cursor: 'default' }} >Delete</Link></td>
                                        </tr>
                                    )
                                })
                            }
                           
                        </tbody>
                    }
                </Table>
            </div>
        </>
    )
}
export default ProductList;