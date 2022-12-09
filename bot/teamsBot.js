const axios = require("axios");
const querystring = require("querystring");
const { TeamsActivityHandler, CardFactory, TurnContext } = require("botbuilder");
const rawWelcomeCard = require("./adaptiveCards/welcome.json");
const rawLearnCard = require("./adaptiveCards/learn.json");
const rawGetPodsCard = require("./adaptiveCards/getpods.json");
const rawChatGPTCard = require("./adaptiveCards/chatgpt.json");
const cardTools = require("@microsoft/adaptivecards-tools");
const getPods = require("./getK8sMetric")
const getChatGPT = require("./getChatGPT")
class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    // record the likeCount
    this.likeCountObj = { likeCount: 50 };
    this.K8s = {
      podList: ""
    }
    var that = this
    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");
      let txt = context.activity.text;
      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      if (removedMentionText) {
        // Remove the line break
        txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }
      if (txt.indexOf("askchatgpt") != -1) {
        const chatgpt = await import('chatgpt')
        console.log("start chatgpt1")
        const api = new chatgpt.ChatGPTAPI({
          sessionToken: "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..w4hmiT_wnNJGnxTx.g50xAcfqiTeFLHxrp6WYbtJwLVBuDqTyh4NQ0tSf9eJVksz94DseqWdJ_8CykHzGzuCbkRpXlUU8gKhmR7WcDN91KpK-wpKsyqCPXKNz-AWTz5qNr-kKm37De1v5dKnHbZ8B-bbDWE_YDvMzxrOidMMfs6RgQhOr5Ro1t1Uh1JB1-k3KQKtlT49oGTRdTzk_C5M73zIS3YDz-h0BrB0GUrV0lv2DlieTrhaVsLEP2ya4hRQi7D-pQ1e9zs3YcvXEvQm78EEaZ6g18Axd8ANVJR-3bg-PBbRLwATnJpmFu_iTpkRa4l8DrnByaT2acCi-nvuKLbjjrvlilRCh37CvIyDC37-GKsjfO2kRL2TaSk0PtuhDLAwwDARsJxa0KmpRyGnl6TsNUHTWHHMAqPVJwGgrily_GVTpBPbYzG918l_nltJCpmOoPBOBMjiUGLulpckkojwqDl_vOS4VzSbIwhUN-vw3YP3Lw_uNSdq6VpiW2xg5QQr9aECU1S29bpJ_zgBmLtzUqiu1od56eB9QE7bEB1Qw430pomEI60qep6NQlKLRettJkwWC7zuBpnyZuqn5nK69hBKXMBjZLJWetJOwD7Wga-wX58OmsQgpuc7Qqx0jt_6c0HW9oh1JjRxOh7tZyjbQOzcRbNa85WqBYiIJBu4SgGRJ3o-P5e4oBZSrDOyrgvVhNVcKQ0xHMnKubemoV3JwC4TVS_591VJuvDTe1P9-wF_pbgh-LNogwImGd4Hf4KiJ97nhAbwyCtKKI4RJHgapTFSRwcVhYEJ1lAMjSrCt2-FyW9TM87xR44bjidDUqD-W_0viHHxSpfzjAOXKVhPdc08YDCBoFVFy5Dd5VPWThu3PaK-gDzM6KY_V93MxNhr1dgghom37QlJLDhVyCOUFJJY0yKjDKEu85efp0_3jsho_t38epfVY2eVbvyt2_AGFztjrD1oZvJ7FOFx5wUlBY_NaeR_SCOfTk1NCT85j4YivTZsz4rV7TWAxc124Hh0s4-POHRfgnUQvg-rdi9XR5lR7A3GynkF3bcOTUVkbZIKZVBq4dHoJoiDm2tr_-m5Kq07V_FMIOQDDFwj7Nlr0z1AlIfZ6OTSR7PMdIJ97sOT9fAjPon-QmxO51NcWsjasDJbqP-zOckzzHRgs2h423KkrdFsYiSRt8FSKrYIQP-n3VUs7MiSEu7y8aw9ZUvDJyxrNiEKPoEOdM0h8rDczl6duSk34Ab14ylQqHBbWGUbqBp1LR4ZKzFjxyslKdQZG54R1kK54srInJvWFX9jEX5REio5eisEBoM4WfEt3sWMhVHQ4s8OPP2XUXJxVz3sASNHEXXnE0b9qREwZa0C4FVtsy3CgyL1Ov2YYJm2ZKUd-MQCPIF1uDq-9BxkvT6-cUo2qo6odTFR-HNxyscC5E_RriwWOJxeyNKeOEG1GKw8fYysNIJjEMTDuX-boGTLRqDnCL66o8lr_HC6spBFXElaq5flwNdRC4wvOnjmuqrwcsbmEQv6My_aIkoCf8JunsEQ9xBqKqZ5EcToAg56s00M9wQ8_slIZNYC_4SnV45mMRBMZvAjTuHJ3MOSvIcVzNCsoraJhk7-dKy8m9VsgcNt46xWJww4_GqMQAbeiksBAqsxpCq9hw5pgrzomt2mYxBCk52wSj47CHBeAkBEWq4FBqlNz5B3RpoG3yY-nnJAWTVnSc1D08RNW1EbMbtJMhBhR4kIIxVwy3lGYpBvO7lddDfyFGA-ndfv743ElulPmUFmlk1Zq8845Vm1wm_N7Yf4QrlBlbTt952ZIrW64VbRTcC4MC0F5riU7WT7H6eWQHy_-YytvPw6rSAdrkIi0Vcu-A5pIqfjCj7kyK0rVsArMg-EjUnNw3WFyzK8Gi77VK-i1FC42zIihXrJvEVgVM38QTLh1jBWUQS1fNIkWTOqhg4kAekmBJY45gwWBCATeeRkcy-Yh18zu78vYgDvAE1s8RwcaKpY-ZK9f7sGoRPG4BFEYv-12-BnlFRbLfGSV0WCuifYWwaY2IWd53WDtZ9oBTTRow4oZ2o6hUGB5talpp1Jof_8CQlzb72U0R-0aBxjU75uf6H1KfXhnBTXbmtCSYfBfNv8_JcNfr2KUuR2l1lMJ8oPlTeqPoqgfx1tKEV_9Z3UCcXr0HWp0bqah-isG3EEP2ZEZkyl-hmzRnYBF7068dzgjwRiaEu8Vtzsvt_olMhUIRxdYSqOF-MgZy4jbMnILaNczjpt5YX99BTqUCf5XCssNSoGrrtOt4FNL-uCl-9hCvWXGpyfcp6EFv83al47E1dw-mDTtuCST0OY59eX0W6eUnnaOk0vR6WNsThHslT0Z8jXXWP8.VPPW1rrVz77uwo4P54tFmA"
        })

        await api.ensureAuth()
        let question=txt.slice("askchatgpt".length,txt.length)
        question=question.trim()
        console.log(question)
        let res = await api.sendMessage(question)
        console.log(res)
        res=res.replace("\n\r","\n\n")
        that.K8s.podList = res
        const card = cardTools.AdaptiveCards.declare(rawChatGPTCard).render(that.K8s);
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });


      }


      // Trigger command by IM text
      switch (txt) {
        case "welcome": {


          const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        case "getpods": {
          console.log("get pods in")
          const res = await getPods("default")
          res.body.items.forEach(item => {
            that.K8s.podList += item.metadata.name + "\n\n"
          })
          console.log(that.K8s)
          const card = cardTools.AdaptiveCards.declare(rawGetPodsCard).render(that.K8s);
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;

        }
        case "learn": {
          // this.likeCountObj.likeCount = 0;
          const card = cardTools.AdaptiveCards.declare(rawLearnCard).render(this.likeCountObj);
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        /**
         * case "yourCommand": {
         *   await context.sendActivity(`Add your response here!`);
         *   break;
         * }
         */
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    // Listen to MembersAdded event, view https://docs.microsoft.com/en-us/microsoftteams/platform/resources/bot-v3/bots-notifications for more events
    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
      }
      await next();
    });
  }

  // Invoked when an action is taken on an Adaptive Card. The Adaptive Card sends an event to the Bot and this
  // method handles that event.
  async onAdaptiveCardInvoke(context, invokeValue) {
    // The verb "userlike" is sent from the Adaptive Card defined in adaptiveCards/learn.json
    if (invokeValue.action.verb === "userlike") {
      this.likeCountObj.likeCount++;
      const card = cardTools.AdaptiveCards.declare(rawLearnCard).render(this.likeCountObj);
      await context.updateActivity({
        type: "message",
        id: context.activity.replyToId,
        attachments: [CardFactory.adaptiveCard(card)],
      });
      return { statusCode: 200 };
    }
  }

  // Message extension Code
  // Action.
  handleTeamsMessagingExtensionSubmitAction(context, action) {
    switch (action.commandId) {
      case "createCard":
        return createCardCommand(context, action);
      case "shareMessage":
        return shareMessageCommand(context, action);
      default:
        throw new Error("NotImplemented");
    }
  }

  // Search.
  async handleTeamsMessagingExtensionQuery(context, query) {
    const searchQuery = query.parameters[0].value;
    const response = await axios.get(
      `http://registry.npmjs.com/-/v1/search?${querystring.stringify({
        text: searchQuery,
        size: 8,
      })}`
    );

    const attachments = [];
    response.data.objects.forEach((obj) => {
      const heroCard = CardFactory.heroCard(obj.package.name);
      const preview = CardFactory.heroCard(obj.package.name);
      preview.content.tap = {
        type: "invoke",
        value: { name: obj.package.name, description: obj.package.description },
      };
      const attachment = { ...heroCard, preview };
      attachments.push(attachment);
    });

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: attachments,
      },
    };
  }

  async handleTeamsMessagingExtensionSelectItem(context, obj) {
    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [CardFactory.heroCard(obj.name, obj.description)],
      },
    };
  }

  // Link Unfurling.
  handleTeamsAppBasedLinkQuery(context, query) {
    const attachment = CardFactory.thumbnailCard("Thumbnail Card", query.url, [query.url]);

    const result = {
      attachmentLayout: "list",
      type: "result",
      attachments: [attachment],
    };

    const response = {
      composeExtension: result,
    };
    return response;
  }
}

function createCardCommand(context, action) {
  // The user has chosen to create a card by choosing the 'Create Card' context menu command.
  const data = action.data;
  const heroCard = CardFactory.heroCard(data.title, data.text);
  heroCard.content.subtitle = data.subTitle;
  const attachment = {
    contentType: heroCard.contentType,
    content: heroCard.content,
    preview: heroCard,
  };

  return {
    composeExtension: {
      type: "result",
      attachmentLayout: "list",
      attachments: [attachment],
    },
  };
}

function shareMessageCommand(context, action) {
  // The user has chosen to share a message by choosing the 'Share Message' context menu command.
  let userName = "unknown";
  if (
    action.messagePayload &&
    action.messagePayload.from &&
    action.messagePayload.from.user &&
    action.messagePayload.from.user.displayName
  ) {
    userName = action.messagePayload.from.user.displayName;
  }

  // This Message Extension example allows the user to check a box to include an image with the
  // shared message.  This demonstrates sending custom parameters along with the message payload.
  let images = [];
  const includeImage = action.data.includeImage;
  if (includeImage === "true") {
    images = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtB3AwMUeNoq4gUBGe6Ocj8kyh3bXa9ZbV7u1fVKQoyKFHdkqU",
    ];
  }
  const heroCard = CardFactory.heroCard(
    `${userName} originally sent this message:`,
    action.messagePayload.body.content,
    images
  );

  if (
    action.messagePayload &&
    action.messagePayload.attachment &&
    action.messagePayload.attachments.length > 0
  ) {
    // This sample does not add the MessagePayload Attachments.  This is left as an
    // exercise for the user.
    heroCard.content.subtitle = `(${action.messagePayload.attachments.length} Attachments not included)`;
  }

  const attachment = {
    contentType: heroCard.contentType,
    content: heroCard.content,
    preview: heroCard,
  };

  return {
    composeExtension: {
      type: "result",
      attachmentLayout: "list",
      attachments: [attachment],
    },
  };
}

module.exports.TeamsBot = TeamsBot;
