import type { Response } from "express";

interface ResponseJson {
    error?: boolean;
    message?: string;
    data?: unknown;
    statusCode?: number;
}

export default class ApiResponse {
    private _response: Response;

    constructor(res: Response) {
        this._response = res;
    }

    /**
     * It returns a response object with a status code of 200 and a message of 'ok' if the payload is
     * valid
     * @param {ResponseJson} payload - ResponseJson
     * @returns A response object with a status code of 200 and a json object with the payload.
     */
    success(payload: ResponseJson) {
        return this._response
            .status(payload.statusCode ? payload.statusCode : 200)
            .json({ error: false, message: "ok", statusCode: 200, ...payload });
    }

    /**
     * It returns a response object with a status code of 500 and a json object with an error message
     * @param {ResponseJson} payload - ResponseJson
     * @returns A function that takes a payload and returns a response.
     */
    error(payload: ResponseJson) {
        return this._response.status(payload.statusCode ? payload.statusCode : 500).json({
            error: true,
            message: "something went wrong",
            statusCode: 500,
            ...payload,
        });
    }

    /**
     * It returns a JSON response with a status code of 500 and an error message
     * @param {unknown} payload - The data that you want to send back to the client.
     * @returns A function that returns a response object.
     */
    errorObj(payload: unknown) {
        return this._response.status(500).json({
            error: true,
            message: payload instanceof Error ? payload.message : "something went wrong",
            statusCode: 500,
            errors: payload instanceof Error && "cause" in payload ? payload.cause : "",
        });
    }
}
