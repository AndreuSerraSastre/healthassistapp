import { Alert, Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../store/selectors";
import FormNotification from "./FormNotification";
import usePushNotifications from "./usePushNotifications";

const Loading = ({ loading }) =>
  loading ? <div className="app-loader">Cargando...</div> : null;
const Error = ({ error }) =>
  error ? (
    <section className="app-error">
      <h2>{error.name}</h2>
      <p>Error: {error.message}</p>
    </section>
  ) : null;

export default function PushNotification() {
  const profile = useSelector(getUserProfile);

  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    onClickDeleteAll,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications(profile);

  const isConsentGranted = userConsent === "granted";

  return (
    <div>
      <Loading loading={loading} />

      <Alert
        showIcon
        message="Es recomendable instalar la aplicación. Si estás en el ordenador sale a la derecha del buscador."
      />
      <Alert
        style={{ marginTop: 20 }}
        showIcon
        type="warning"
        message="Es posible que los correos llegen a la carpeta de spam, haz una prueba manual para que te llegue uno, indica que no es spam. No volverá a pasar."
      />

      {!pushNotificationSupported && (
        <p>
          Push notification are {!pushNotificationSupported && "NOT"} supported
          by your device.
        </p>
      )}

      <Error error={error} />
      <br></br>
      <Button
        style={{ width: "100%" }}
        disabled={!pushNotificationSupported || isConsentGranted}
        onClick={onClickAskUserPermission}
      >
        {isConsentGranted
          ? "Notificaciones permitidas"
          : "Preguntar notificaciones"}
      </Button>

      <br></br>
      <br></br>

      <Button
        style={{ width: "100%" }}
        disabled={
          !pushNotificationSupported || !isConsentGranted || userSubscription
        }
        onClick={onClickSusbribeToPushNotification}
      >
        Crear identificador de dispositivo
      </Button>

      <br></br>
      <br></br>

      <Button
        style={{ width: "100%" }}
        disabled={!userSubscription || pushServerSubscriptionId}
        onClick={onClickSendSubscriptionToPushServer}
      >
        Enviar dispositivo al servidor
      </Button>

      <br></br>
      <br></br>

      <Button style={{ width: "100%" }} onClick={onClickDeleteAll}>
        Borrar todos los dispositivos vinculados
      </Button>
      <br></br>
      <br></br>

      <Alert
        showIcon
        message="Es necesario cerrar del todo el navegador para reiniciarlo y que lleguen las notificaciones."
      />

      {pushServerSubscriptionId && (
        <div>
          <br></br>
          <Button style={{ width: "100%" }} onClick={onClickSendNotification}>
            Probar una notificación
          </Button>
          <br></br>
          <br></br>
        </div>
      )}

      {/* <section>
        <h4>El detalle de tus notificaciones: </h4>
        <pre>
          <code>{JSON.stringify(userSubscription, null, " ")}</code>
        </pre>
      </section> */}

      <FormNotification profile={profile}></FormNotification>
    </div>
  );
}
