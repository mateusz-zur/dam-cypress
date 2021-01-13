let ASSET_INITIAL_METADATA = {
    "timespan": [{
        "group": [{
            "name": "asset",
            "field": [{
                "name": "basic_info_asset_title",
                "value": [{
                    "value": "Test asset"
                }]
            }, {
                "name": "some_text_field",
                "value": []
            }],
            "group": [{
                "name": "basic_info_campaign_cascade",
                "field": [{
                    "name": "basic_info_brand",
                    "value": [{
                        "value": "visage_fashion"
                    }]
                }, {
                    "name": "basic_info_campaign",
                    "value": [{
                        "value": "visage_homme"
                    }]
                }],
                "group": []
            }, {
                "name": "usage_rights",
                "field": [{
                    "name": "usage_rights_start_date",
                    "value": []
                }, {
                    "name": "usage_rights_expiry_date",
                    "value": []
                }, {
                    "name": "usage_rights_territories",
                    "value": []
                }, {
                    "name": "usage_rights_uses",
                    "value": []
                }],
                "group": []
            }, {
                "name": "content_type_cascade",
                "field": [{
                    "name": "asset_contenttype",
                    "value": []
                }, {
                    "name": "hogarthww_assettype",
                    "value": []
                }],
                "group": []
            }, {
                "name": "awards",
                "field": [{
                    "name": "awards_award",
                    "value": []
                }, {
                    "name": "awards_placement",
                    "value": []
                }, {
                    "name": "awards_year",
                    "value": []
                }],
                "group": []
            }, {
                "name": "outer",
                "field": [{
                    "name": "outer_first",
                    "value": []
                }, {
                    "name": "outer_third",
                    "value": []
                }],
                "group": [{
                    "name": "inner",
                    "field": [{
                        "name": "inner_first",
                        "value": []
                    }, {
                        "name": "inner_second",
                        "value": []
                    }],
                    "group": []
                }]
            }]
        }],
        "start": "-INF",
        "end": "+INF"
    }]
}
let VIDEO_ASSET_INITIAL_METADATA = JSON.parse(JSON.stringify(ASSET_INITIAL_METADATA))
VIDEO_ASSET_INITIAL_METADATA["timespan"][0]["group"][0]["group"].push({
    "name": "media_info",
    "field": [],
    "group": [{
        "name": "media_info_video",
        "field": [{
            "name": "mediatypevideo_clock_number",
            "value": []
        }, {
            "name": "mediatypevideo_vo_talend",
            "value": []
        }, {
            "name": "mediatypevideo_broadcast_ready",
            "value": [{
                "value": "false"
            }]
        }, {
            "name": "mediatypevideo_duration",
            "value": []
        }, {
            "name": "basic_duration",
            "value": []
        }],
        "group": []
    }]
})

export { VIDEO_ASSET_INITIAL_METADATA };
