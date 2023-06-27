import React from "react";
import Card from "../Card/Card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cadastrarEvento } from "../../services/events";
import {
  CardBody,
  CardFieldset,
  CardInput,
  CardTextArea,
  CardWrapper,
} from "./styles";
import Button from "../Button/Button";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("O título é obrigatório"),
  description: Yup.string().required("A descrição é obrigatória"),
  date: Yup.date().required("A data é obrigatória"),
});

const CreateEventFormCard = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await cadastrarEvento({ ...values, owner: localStorage.getItem("user")});
    },
  });
  return (
    <CardWrapper>
      <Card header="Criar um novo evento">
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <CardFieldset>
              <label htmlFor="title">Título</label>
              <CardInput
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <small>{formik.errors.title}</small>
              )}
            </CardFieldset>

            <CardFieldset>
              <label htmlFor="description">Descrição</label>
              <CardTextArea
                placeholder="Descrição"
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <small>{formik.errors.description}</small>
              )}
            </CardFieldset>

            <CardFieldset>
              <label htmlFor="date">Data</label>
              <CardInput
                id="date"
                name="date"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date && (
                <small>{formik.errors.date}</small>
              )}
            </CardFieldset>

            <CardFieldset>
              <Button type="submit" title="Enviar" />
            </CardFieldset>
          </form>
        </CardBody>
      </Card>
    </CardWrapper>
  );
};

export default CreateEventFormCard;
