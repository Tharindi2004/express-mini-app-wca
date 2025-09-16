export interface WebhookVerificationDto {
    entry: any;
    mode: string;
    mood: string;
    challenge: string;
    verify_token: string;
}
export interface WebhookVerificationResponseDto {
    status: boolean;
    challenge: string;
}
export interface webhookMessageDto {
    object: string;
    entry: [
        {
            id: string;
            changes: [
                {
                  value: {
                    messaging_product: string;
                    metadata: {
                        display_phone_number: string;
                        phone_number_id: string;
                    },
                    contacts: [
                        {
                            profile: {
                                name: string;
                            };
                            wa_id: string;

                    }
                ],

                    messages: [
                        {
                            from: string;
                            id: string;
                            timestamp: string;
                            text: {
                                body: string;
                            };
                            type: string;

                    }
                ]

                };

                  field: string;

            }
            ]

    }
]

}


