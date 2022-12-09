

function getChatGPT(question) {
    import('chatgpt').then(chatgpt => {
        console.log("start chatgpt1")
    
        const api = new chatgpt.ChatGPTAPI({
            sessionToken: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..w4hmiT_wnNJGnxTx.g50xAcfqiTeFLHxrp6WYbtJwLVBuDqTyh4NQ0tSf9eJVksz94DseqWdJ_8CykHzGzuCbkRpXlUU8gKhmR7WcDN91KpK-wpKsyqCPXKNz-AWTz5qNr-kKm37De1v5dKnHbZ8B-bbDWE_YDvMzxrOidMMfs6RgQhOr5Ro1t1Uh1JB1-k3KQKtlT49oGTRdTzk_C5M73zIS3YDz-h0BrB0GUrV0lv2DlieTrhaVsLEP2ya4hRQi7D-pQ1e9zs3YcvXEvQm78EEaZ6g18Axd8ANVJR-3bg-PBbRLwATnJpmFu_iTpkRa4l8DrnByaT2acCi-nvuKLbjjrvlilRCh37CvIyDC37-GKsjfO2kRL2TaSk0PtuhDLAwwDARsJxa0KmpRyGnl6TsNUHTWHHMAqPVJwGgrily_GVTpBPbYzG918l_nltJCpmOoPBOBMjiUGLulpckkojwqDl_vOS4VzSbIwhUN-vw3YP3Lw_uNSdq6VpiW2xg5QQr9aECU1S29bpJ_zgBmLtzUqiu1od56eB9QE7bEB1Qw430pomEI60qep6NQlKLRettJkwWC7zuBpnyZuqn5nK69hBKXMBjZLJWetJOwD7Wga-wX58OmsQgpuc7Qqx0jt_6c0HW9oh1JjRxOh7tZyjbQOzcRbNa85WqBYiIJBu4SgGRJ3o-P5e4oBZSrDOyrgvVhNVcKQ0xHMnKubemoV3JwC4TVS_591VJuvDTe1P9-wF_pbgh-LNogwImGd4Hf4KiJ97nhAbwyCtKKI4RJHgapTFSRwcVhYEJ1lAMjSrCt2-FyW9TM87xR44bjidDUqD-W_0viHHxSpfzjAOXKVhPdc08YDCBoFVFy5Dd5VPWThu3PaK-gDzM6KY_V93MxNhr1dgghom37QlJLDhVyCOUFJJY0yKjDKEu85efp0_3jsho_t38epfVY2eVbvyt2_AGFztjrD1oZvJ7FOFx5wUlBY_NaeR_SCOfTk1NCT85j4YivTZsz4rV7TWAxc124Hh0s4-POHRfgnUQvg-rdi9XR5lR7A3GynkF3bcOTUVkbZIKZVBq4dHoJoiDm2tr_-m5Kq07V_FMIOQDDFwj7Nlr0z1AlIfZ6OTSR7PMdIJ97sOT9fAjPon-QmxO51NcWsjasDJbqP-zOckzzHRgs2h423KkrdFsYiSRt8FSKrYIQP-n3VUs7MiSEu7y8aw9ZUvDJyxrNiEKPoEOdM0h8rDczl6duSk34Ab14ylQqHBbWGUbqBp1LR4ZKzFjxyslKdQZG54R1kK54srInJvWFX9jEX5REio5eisEBoM4WfEt3sWMhVHQ4s8OPP2XUXJxVz3sASNHEXXnE0b9qREwZa0C4FVtsy3CgyL1Ov2YYJm2ZKUd-MQCPIF1uDq-9BxkvT6-cUo2qo6odTFR-HNxyscC5E_RriwWOJxeyNKeOEG1GKw8fYysNIJjEMTDuX-boGTLRqDnCL66o8lr_HC6spBFXElaq5flwNdRC4wvOnjmuqrwcsbmEQv6My_aIkoCf8JunsEQ9xBqKqZ5EcToAg56s00M9wQ8_slIZNYC_4SnV45mMRBMZvAjTuHJ3MOSvIcVzNCsoraJhk7-dKy8m9VsgcNt46xWJww4_GqMQAbeiksBAqsxpCq9hw5pgrzomt2mYxBCk52wSj47CHBeAkBEWq4FBqlNz5B3RpoG3yY-nnJAWTVnSc1D08RNW1EbMbtJMhBhR4kIIxVwy3lGYpBvO7lddDfyFGA-ndfv743ElulPmUFmlk1Zq8845Vm1wm_N7Yf4QrlBlbTt952ZIrW64VbRTcC4MC0F5riU7WT7H6eWQHy_-YytvPw6rSAdrkIi0Vcu-A5pIqfjCj7kyK0rVsArMg-EjUnNw3WFyzK8Gi77VK-i1FC42zIihXrJvEVgVM38QTLh1jBWUQS1fNIkWTOqhg4kAekmBJY45gwWBCATeeRkcy-Yh18zu78vYgDvAE1s8RwcaKpY-ZK9f7sGoRPG4BFEYv-12-BnlFRbLfGSV0WCuifYWwaY2IWd53WDtZ9oBTTRow4oZ2o6hUGB5talpp1Jof_8CQlzb72U0R-0aBxjU75uf6H1KfXhnBTXbmtCSYfBfNv8_JcNfr2KUuR2l1lMJ8oPlTeqPoqgfx1tKEV_9Z3UCcXr0HWp0bqah-isG3EEP2ZEZkyl-hmzRnYBF7068dzgjwRiaEu8Vtzsvt_olMhUIRxdYSqOF-MgZy4jbMnILaNczjpt5YX99BTqUCf5XCssNSoGrrtOt4FNL-uCl-9hCvWXGpyfcp6EFv83al47E1dw-mDTtuCST0OY59eX0W6eUnnaOk0vR6WNsThHslT0Z8jXXWP8.VPPW1rrVz77uwo4P54tFmA"
        })
    
        // ensure the API is properly authenticated
        api.ensureAuth().then(() => {
            console.log("start chatgpt2")
            return api.sendMessage(question)
        })
    })
}

module.exports = getChatGPT