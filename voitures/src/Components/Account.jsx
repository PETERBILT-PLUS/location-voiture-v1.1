import { useFormik } from "formik";
import { Container, Form, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../Configuration/api";
import { loginUser } from "../Configuration/main";
import { accountShema } from "../Configuration/Schema";

function Account() {
    const dispatch = useDispatch();
    const [updateUser] = useUpdateUserMutation();
    const username = useSelector((state) => state.user.user?.currentUser.username);
    const email = useSelector((state) => state.user.user?.currentUser.email);
    const _id = useSelector((state) => state.user.user?.currentUser._id);
    
    const onSubmit = async (values, action) => {
        const userUpdate = () => toast.success("Update");
        try {
            const res = await updateUser({
                username: values.username,
                email: values.email,
                password: values.password,
                userId: _id
            });
            console.log(res);
            console.log(res.data);
            console.log(res.data.success);
            if (res.data.success) {
                dispatch(loginUser(res.data));
            } else {
                return null
            }
        } catch (error) {
            console.log("an error happened" + " " + error.message);
        }
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            username: username,
            email: email,
            password: "",
            confirmPassword: "",
        },
        validationSchema: accountShema,
        onSubmit,
    });
    return (
        <section className="bg-light py-5">
            <Container>
                <ToastContainer />
                <h2 className="title text-center py-5">Compte</h2>
                <Form className="border col-12 col-md-8 col-lg-4 m-auto pt-3 pb-5 px-4" style={{ borderRadius: "5px" }} autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Control value={values.username} onChange={handleChange} onBlur={handleBlur} type="text" className="py-2 my-3" placeholder="Nom" name="username" />
                    {errors.username && touched.username && <p className="text-danger fs-6 px-2">{errors.username}</p>}
                    <Form.Control value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" className="py-2 my-3" placeholder="E-mail" name="email" />
                    {errors.email && touched.email && <p className="text-danger fs-6 px-2">{errors.email}</p>}
                    <Form.Control value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" className="py-2 my-3" placeholder="password (min 5)" name="password" />
                    {errors.password && touched.password && <p className="text-danger fs-6 px-2">{errors.password}</p>}
                    <Form.Control value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} type="password" className="py-2 my-3" placeholder="Confirmer password" id="confirmPassword" />
                    {errors.confirmPassword && touched.confirmPassword && <p className="text-danger fs-6 px-2">{errors.confirmPassword}</p>}
                    <Form.Control type="submit" disabled={isSubmitting} className="btn-submit" value="Update" />
                </Form>
            </Container>
        </section>
    );
}

export default Account;