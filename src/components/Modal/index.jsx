import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "./Modal.module.scss";

export default function Modal({
    isOpen = false,
    children,
    onRequestClose,
    shouldCloseOnOverlayClick = true,
    shouldCloseOnEsc = true,
    overlayClassName,
    className,
    bodyOpenClassName = "modal-open",
    htmlOpenClassName = "modal-open",
}) {
    useEffect(() => {
        const handleCloseModal = () => {
            onRequestClose();
        }
        const handleEscClose = (e) => {
            if (shouldCloseOnEsc) {
                if (e.code === "Escape") {
                    handleCloseModal();
                }
            }
        }

        document.addEventListener("keyup", (e) => handleEscClose(e));
        const htmlElement = document.documentElement;
        htmlElement.classList.add(htmlOpenClassName);

        document.body.classList.add(bodyOpenClassName);
        return () => {
            document.removeEventListener("keyup", (e) => handleEscClose(e));
            htmlElement.classList.remove(htmlOpenClassName);
            document.body.classList.remove(bodyOpenClassName);
        }
    }, [onRequestClose, shouldCloseOnEsc, htmlOpenClassName, bodyOpenClassName])

    if (!isOpen) return null;

    const overlayClassNames = clsx(styles.overlay, overlayClassName);
    const modalClassNames = clsx(styles.modal, className);
    return (
        <div className={clsx(modalClassNames)}>
            {/* Body */}
            <div className={styles.content}>
                {/* CloseBtn */}
                <button className={styles.closeBtn} onClick={() => {
                    onRequestClose();
                }}>
                    &times;
                </button>

                <div className={styles.inner}>{children}</div>
            </div>

            {/* Overlay */}
            <div className={clsx(overlayClassNames)} onClick={() => {
                if (shouldCloseOnOverlayClick) {
                    onRequestClose();
                }
            }}></div>
        </div>
    )
}

Modal.prototypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onRequestClose: PropTypes.func,
    onAfterOpen: PropTypes.func,
    onAfterClose: PropTypes.func,
    closeTimeoutMS: PropTypes.number,
    shouldCloseOnOverlayClick: PropTypes.bool,
    shouldCloseOnEsc: PropTypes.bool,
    overlayClassName: PropTypes.string,
    className: PropTypes.string,
    bodyOpenClassName: PropTypes.string,
    htmlOpenClassName: PropTypes.string
}