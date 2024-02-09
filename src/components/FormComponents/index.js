import { getUsers } from "../../store/selectors";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  TimePicker,
} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { ROLE_OPTS } from "../../constants/permissions";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../../store/selectors";
import DatePicker from "./DatePicker";

export const rules = [{ required: true, message: "⚠️ Campo requerido. ⚠️" }];

const { Option } = Select;

const { TextArea } = Input;

export const CommercialRegisterInput = (props) => {
  return (
    <Form.Item
      label="Registro comercial"
      name="commercial_register"
      rules={rules}
      {...props}
    >
      <Input placeholder="Registro comercial..." />
    </Form.Item>
  );
};

export const MachineStateInput = (props) => {
  return (
    <Form.Item name="state" label="Estado" rules={rules} {...props}>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: "En servicio", value: "InService" },
          { label: "Fuera de uso", value: "OutOfService" },
          { label: "De baja", value: "Inactive" },
        ]}
      />
    </Form.Item>
  );
};

export const PhoneNumberInput = (props) => {
  return (
    <Form.Item name="phone" label="Nº Teléfono">
      <Input style={{ width: "100%" }} placeholder="Número" />
    </Form.Item>
  );
};

export const EmailInput = (props) => {
  return (
    <Form.Item name="email" label="Email" rules={rules} {...props}>
      <Input type="email" placeholder="Email..." autoComplete="username" />
    </Form.Item>
  );
};

export const EstablishmentLocation = () => {
  return (
    <Form.Item>
      <Input.Group compact>
        <Form.Item label="País" name={["location", "country"]}>
          <Input placeholder="País..." />
        </Form.Item>
        <Form.Item label="Comunidad" name={["location", "community"]}>
          <Input placeholder="Comunidad..." />
        </Form.Item>
      </Input.Group>
      <Form.Item label="Dirección" name={["location", "address"]}>
        <Input placeholder="Dirección..." />
      </Form.Item>
      <Input.Group compact>
        <Form.Item label="Población" name={["location", "town"]}>
          <Input placeholder="Población..." />
        </Form.Item>
        <Form.Item label="Código postal" name={["location", "postal_code"]}>
          <Input placeholder="Código postal..." />
        </Form.Item>
      </Input.Group>
    </Form.Item>
  );
};

// FORM COMPONENTS - ESTABLISHMENT
export const FiscalNameInput = (props) => {
  return (
    <Form.Item
      label="Nombre fiscal"
      name="fiscal_name"
      rules={rules}
      {...props}
    >
      <Input placeholder="Nombre fiscal" />
    </Form.Item>
  );
};

// FORM COMPONENTS - NORMAL
export const IdInput = (props) => {
  return (
    <Form.Item name="_id" {...props} style={{ display: "none" }}>
      <Input />
    </Form.Item>
  );
};

export const NameInput = (props) => {
  return (
    <Form.Item name="name" rules={rules} {...props}>
      <Input placeholder={props.placeholder || "Nombre..."} />
    </Form.Item>
  );
};

export const BasicInput = (props) => {
  return (
    <Form.Item rules={props.rule && rules} {...props} label={props.placeholder}>
      <Input {...props} />
    </Form.Item>
  );
};

export const ObservationInput = (props) => {
  return (
    <Form.Item rules={props.rule && rules} {...props} label={props.placeholder}>
      <TextArea {...props} autoSize={{ minRows: 3, maxRows: 3 }} />
    </Form.Item>
  );
};

export const PasswordInput = (props) => {
  return (
    <Form.Item name="password" label="Contraseña" {...props}>
      <Input.Password type="password" placeholder="Contraseña..." autoComplete="current-password" />
    </Form.Item>
  );
};

// FORM COMPONENTS - PROFILE FORM
export const ProfileNameInput = (props) => {
  return (
    <Form.Item name="name" label="Nombre" rules={rules} {...props}>
      <Input placeholder="Nombre..." />
    </Form.Item>
  );
};

export const SubmitButton = (props) => {
  return (
    <Form.Item style={{ width: "100%" }}>
      <Button htmlType="submit" type="primary" {...props}>
        {props.text ? props.text : "ENVIAR"}
      </Button>
    </Form.Item>
  );
};

export const SurnameInput = (props) => {
  return (
    <Form.Item name="surname" label="Apellidos" rules={rules} {...props}>
      <Input placeholder="Apellidos..." />
    </Form.Item>
  );
};

export const UsernameInput = (props) => {
  return (
    <Form.Item name="username" label="Usuario" rules={rules} {...props}>
      <Input placeholder="Usuario..." />
    </Form.Item>
  );
};

export const RoleSelector = (props) => {
  const onChange = (value) => {
    props.form.setFieldsValue({ role: value });
  };

  const getCurrentRoles = () => {
    return Object.values(ROLE_OPTS);
  };

  return (
    <Form.Item name="role" rules={rules} {...props}>
      <Select
        {...props}
        allowClear
        onChange={onChange}
        placeholder={props.placeholder || "Role"}
      >
        {getCurrentRoles().map((e) => (
          <Option key={e.value} value={e.value}>
            {e.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const BasicInputNumber = (props) => {
  return (
    <Form.Item
      {...props}
      style={props.style || { width: "100%" }}
      label={props.placeholder}
      rules={props.rule && rules}
    >
      <InputNumber
        {...props}
        style={props.style || { width: "100%" }}
        type="number"
      />
    </Form.Item>
  );
};

export const BasicDateHourInput = (props) => {
  const dateFormat = "DD/MM/YYYY HH:mm";
  return (
    <Form.Item style={{ width: "100%" }} rules={props.rule && rules} label={props.label || props.placeholder} {...props}>
      <DatePicker
        showTime
        format={dateFormat}
        style={{ width: "100%" }}
        {...props}
      />
    </Form.Item>
  );
};

export const BasicCheckbox = (props) => {
  const theme = useSelector(getCurrentTheme)

  return (
    <Form.Item
      label={props.placeholder}
      valuePropName="checked"
      rules={props.rule && rules}
      {...props}
    >
      <Checkbox {...props} style={{ color: theme ? "black" : "white" }}>{props.text}</Checkbox>
    </Form.Item >
  );
};

export const CustomNotification = (props) => {
  const dateFormat = "HH:mm";
  return (
    <div style={{ marginTop: 20, width: "100%" }}>
      <Form.List name="notifications">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item {...restField} name={[name, "text"]} rules={rules}>
                  <Input placeholder="Título" />
                </Form.Item>
                <Form.Item {...restField} name={[name, "time"]} rules={rules}>
                  <TimePicker format={dateFormat} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "notify"]}
                  valuePropName="checked"
                >
                  <Checkbox>Notificar</Checkbox>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Añadir notificación
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};
export const UsersSelect = (props) => {
  const onChange = (value) => {
    props.form.setFieldsValue({ User: value });
  };

  const data = useSelector(getUsers);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) {
      setItems(
        Object.values(data)
          .sort((a, b) => a.label.localeCompare(b.label))
      );
    }
  }, [data, props.type]);

  const onSearch = (value) => {
    setItems(
      Object.values(data)
        .sort((a, b) => a.label.localeCompare(b.label))
        .filter(
          (x) =>
            x.name.toUpperCase().includes(value.toUpperCase())
        )
    );
  };

  return (
    <Form.Item
      name={props.name || "User"}
      label={props.placeholder || "Usuario"}
      rules={props.rule && rules}
      {...props}
    >
      <Select
        {...props}
        allowClear
        showSearch
        onSearch={onSearch}
        onChange={onChange}
        placeholder={props.placeholder || "Usuario"}
        options={items}
        filterOption={false}
      ></Select>
    </Form.Item>
  );
};
