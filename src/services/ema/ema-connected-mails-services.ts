/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponseEmpty } from '@/models/common';
import { IConnectedMailListResponse } from '@/modules/EMA/connected-mails/types';
import {
    ISenderInformationFindResponse,
    ISenderInformationItem,
} from '@/modules/EMA/sender-information/types';
import { ErrorCallBack, HttpUtil, IHTTPSParams } from '../adapter-config/config';

export class EmaConnectedMailsService {
    // eslint-disable-next-line no-use-before-define
    private static instance: EmaConnectedMailsService | null;

    private constructor() { }

    /**
     * Returns the singleton instance of EmaConnectedMailsService.
     * @returns The singleton instance of EmaConnectedMailsService.
     */
    public static getInstance(): EmaConnectedMailsService {
        if (!this.instance) {
            EmaConnectedMailsService.instance = new EmaConnectedMailsService();
        }
        return EmaConnectedMailsService.instance!;
    }

    public async getList(
        params?: IHTTPSParams[],
        onError?: ErrorCallBack
    ): Promise<IConnectedMailListResponse> {
        const res = await HttpUtil.get(
            `api/client/connectedEmails`,
            params,
            false,
            onError
        );
        return res;
    }

    public async toggleStatus(
        payload: { id: number },
        onError?: ErrorCallBack
    ): Promise<IGlobalResponseEmpty> {
        const res = await HttpUtil.put(
            `api/client/connectedEmails/toggle`,
            payload,
            onError,
            null
        );
        return res;
    }

    public async removeConnectedMail(
        id: number,
        onError?: ErrorCallBack,
        abortController?: AbortController['signal']
    ): Promise<IGlobalResponseEmpty> {
        const res = await HttpUtil.delete(
            `api/client/connectedEmails?id=${id}`,
            onError,
            abortController
        );
        return res;
    }



    public async findSenderInformation(
        id: number,
        onError?: ErrorCallBack
    ): Promise<ISenderInformationFindResponse> {
        const res = await HttpUtil.get(
            `api/client/senderInformations/find?id=${id}`,
            null,
            false,
            onError,
            null
        );
        return res;
    }

    public async removeSenderInformation(
        id: number,
        onError?: ErrorCallBack,
        abortController?: AbortController['signal']
    ): Promise<IGlobalResponseEmpty> {
        const res = await HttpUtil.delete(
            `api/client/senderInformations?id=${id}`,
            onError,
            abortController
        );
        return res;
    }

    public async createSenderInformation(
        payload: Omit<ISenderInformationItem, 'id'>,
        onError?: ErrorCallBack
    ): Promise<IGlobalResponseEmpty> {
        const res = await HttpUtil.post(
            `api/client/senderInformations`,
            payload,
            onError,
            null
        );
        return res;
    }
}
