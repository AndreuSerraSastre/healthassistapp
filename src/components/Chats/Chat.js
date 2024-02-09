import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SET_CURRENT_ROUTE } from '../../constants';
import { routes } from '../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Popconfirm, Select } from 'antd';
import { useIsMobile } from '../../utils';
import { FlexSpace } from '../../styles';
import { ArrowUpOutlined, DownloadOutlined } from '@ant-design/icons';
import { MessagesWrapper } from '../../pages/styles';
import { getChats, getUserProfile, getUsers } from '../../store/selectors';
import Message from './Message';
import { message as msg } from 'antd';
import { createChat, deleteChats, updateChat } from '../../actions/ChatsActions';
import status from "http-status";
import { DeleteIcon } from '../../constants/icons';

const Chat = () => {
    const isMobile = useIsMobile();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [message, setMessage] = useState()
    const chats = useSelector(getChats);
    const [loading, setLoading] = useState()
    const history = useNavigate();
    const profile = useSelector(getUserProfile)
    const [title, setTitle] = useState()
    const [model, setModel] = useState("GPT")
    const users = useSelector(getUsers)

    const messagesRef = useRef();

    useEffect(() => {
        if (chats) {
            if (id && chats[id]) {
                dispatch({
                    type: SET_CURRENT_ROUTE,
                    payload: { ...routes["home"], title: `${chats[id].title}` },
                });
                setTitle(chats[id].title)
            } else {
                if (!id) return
                msg.error("Chat no encontrado")
                history("/home")
                dispatch({
                    type: SET_CURRENT_ROUTE,
                    payload: routes["home"],
                });
            }
        }
    }, [id, dispatch, chats, history])

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        if (chats && id && chats[id] && messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [chats, id, messagesRef])

    const handleMessage = async () => {
        if (loading) return
        if (!message) return
        setLoading(true)
        if (id && chats[id]) {
            const response = await dispatch(updateChat({ _id: chats[id]._id, messages: [...chats[id].messages, { user: profile._id, message }], model: model }))
            if (status[`${response.status}_CLASS`] === status.classes.SUCCESSFUL) {
                msg.success("Mensaje enviado")
                // Hacer scroll al final
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            } else {
                msg.error("Error al enviar el mensaje")
                setLoading(false)
                return;
            }

        } else {
            const response = await dispatch(createChat({ user: profile._id, messages: [{ user: profile._id, message }], model: model }))
            if (status[`${response.status}_CLASS`] === status.classes.SUCCESSFUL) {
                msg.success("Chat creado y mensaje enviado")
                history("/" + response.data._id)
            } else {
                msg.error("Error al crear el chat y enviar el mensaje")
                setLoading(false)
                return;
            }
        }

        setMessage()
        setLoading(false)
    }



    const handleSetTitle = async () => {
        if (loading) return
        if (!title) return
        if (title === chats[id].title) return
        setLoading(true)
        if (id && chats[id]) {
            const response = await dispatch(updateChat({ _id: chats[id]._id, title: title }))
            if (status[`${response.status}_CLASS`] === status.classes.SUCCESSFUL) {
                msg.success("Título actualizado")
            } else {
                msg.error("Error al actualizar el título")
                setLoading(false)
                return;
            }
        }
        setLoading(false)
    }

    const confirm = async () => {
        if (loading) return
        setLoading(true)
        history("/home")
        await dispatch(deleteChats([id]))
        setLoading(false)
    }

    const downloadChatCSV = async () => {
        if (loading) return
        setLoading(true)

        // Convertir los mensajes a CSV
        const csv = chats[id].messages.map((message) => {
            return `${message.user ? users[message.user]?.label : message.model},"${message.message}"`
        }).join("\n")

        // Descargar el CSV
        const element = document.createElement("a");
        const file = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        element.href = URL.createObjectURL(file);
        element.download = `${chats[id].title}.csv`;
        document.body.appendChild(element);
        element.click();

        setLoading(false)
    }


    return (
        <div style={{ position: "relative", overflow: "hidden" }}>

            <div style={{ width: "100%", display: "flex", alignItems: "center", position: "absolute", top: 10, padding: "0px 10px 0px 10px", justifyContent: "space-between" }}>
                {id && title && <div>
                    <Input size='small' value={title} style={{ width: 150 }}
                        placeholder='Título del chat...' onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSetTitle()
                            }
                        }}
                        suffix={
                            <Button loading={loading} onClick={handleSetTitle}
                                style={{ border: "none", boxShadow: "none", background: "rgba(255, 255, 255, 0.2)", width: 15, height: 15, fontSize: 10, padding: 0, color: loading ? "#fff" : "#38393F" }}>
                                {!loading && <ArrowUpOutlined />}
                            </Button>
                        }></Input>
                    <Popconfirm
                        title="¿Está seguro de borrar este chat?"
                        onConfirm={confirm}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button className='delete-button-chat' style={{ width: 24, height: 24, padding: 0, marginLeft: 10, fontSize: 12 }} danger>  <DeleteIcon></DeleteIcon></Button>
                    </Popconfirm>
                </div>
                }
                <div>
                    <Select style={{ marginLeft: 10, width: 150, }} size="small" value={model} onChange={setModel} options={[
                        { label: "GPT", value: "GPT" },
                        { label: "Llama", value: "Llama", disabled: true },
                        { label: "Mixtral", value: "Mixtral", disabled: true },
                    ]} placeholder="Modelo" allowClear={false}></Select>
                    <Button style={{ width: 24, height: 24, padding: 0, marginLeft: 10, fontSize: 12 }} onClick={downloadChatCSV}><DownloadOutlined /></Button>
                </div>
            </div>

            <div style={{ width: isMobile ? "80%" : 708, position: "relative", height: isMobile ? "75vh" : "80vh", margin: "auto" }}>

                <MessagesWrapper ref={messagesRef} style={{ height: isMobile ? "60vh" : "73vh", overflowY: "auto", marginTop: 65 }}>
                    {chats && chats[id] && chats[id].messages.map((message, index) =>
                        <Message key={index} user={message.user} message={message.message} model={message.model}></Message>
                    )}
                </MessagesWrapper>
                <FlexSpace className='chatsearchwrapper' style={{ position: "absolute", bottom: 0 }}>
                    <Input
                        loading={loading}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        autoFocus={true}
                        size={'large'}
                        placeholder="Mensaje a Health Assistant..."
                        allowClear
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleMessage()
                            }
                        }
                        }
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        style={{
                            width: isMobile ? "80%" : "100%", margin: "auto", borderRadius: 10
                        }}
                        suffix={
                            <Button loading={loading} onClick={handleMessage} style={{ border: "none", boxShadow: "none", background: "rgba(255, 255, 255, 0.2)", width: 30, height: 30, padding: 0, color: loading ? "#fff" : "#38393F" }}>
                                {!loading && <ArrowUpOutlined />}
                            </Button>
                        }
                    />
                </FlexSpace>
            </div>
        </div>
    );
};

export default Chat;
