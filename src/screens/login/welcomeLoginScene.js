import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BaseScene from 'memenet/src/screens/baseScene';
import {
  GenericTextComponent,
  GenericModalInfoContainerComponent,
  GenericButtonComponent
} from 'memenet/src/components/presentation';
import colors from 'memenet/src/commons/colors';
import FadeComponent from 'memenet/src/components/container/animations/fadeComponent';
import { TextLinkButtonComponent } from 'memenet/src/components/presentation/textLinkButtonComponent';
import { verticalScale, horizontalScale } from 'memenet/src/commons/scaling';
import Store from 'memenet/src/store';

export default class WelcomeLoginScene extends BaseScene {
  constructor(props) {
    super({
      childComponentId: props.componentId,
      containerType: BaseScene.ContainerType.IMAGESCROLLVIEW,
      ...props
    });

    this.state = {
      startDotzAnimation: false,
      showModal: false
    };
  }

  render() {
    const { startDotzAnimation, showModal } = this.state;
    return super.render(
      <View style={styles.container}>
        <View>
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
            color={colors.white}
            text="Compartilhe a"
          />
          <GenericTextComponent
            styleguideItem={GenericTextComponent.StyleguideItem.BODY}
            text="Felicidade"
            color={colors.coral}
            marginBottom={verticalScale(10)}
          />
          <TextLinkButtonComponent
            styleguideItem={GenericTextComponent.StyleguideItem.DEFAULT}
            text={'De asas a sua imaginação com o\nnosso criador de memes'}
            color={colors.white}
            onPress={() => this.setState({ showModal: true })}
          />
        </View>
        <View>
          <View style={styles.buttons}>
            <GenericButtonComponent
              buttonColor="transparente"
              textColor={colors.white}
              boderColor={colors.white}
              text="ENTRAR"
              onPress={() =>
                this.type == 'search'
                  ? this.onFilterPressSearch()
                  : this.onFilterPress()
              }
            />
            <GenericButtonComponent
              buttonColor={colors.coral}
              textColor={colors.white}
              text="CADASTRAR"
              onPress={() =>
                this.type == 'search'
                  ? this.onFilterPressSearch()
                  : this.onFilterPress()
              }
            />
          </View>
          <View style={styles.lineItems}>
            <View style={styles.lineItem} />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.BUTTON}
              text="OU"
              color={colors.white}
            />
            <View style={styles.lineItem} />
          </View>
          <View style={styles.facebook}>
            <Image
              source={require('memenet/src/assets/img/face.png')}
              style={{ marginRight: horizontalScale(10) }}
            />
            <GenericTextComponent
              styleguideItem={GenericTextComponent.StyleguideItem.LINK}
              text="Entrar com facebook"
              color={colors.white}
            />
          </View>
        </View>

        {this.renderInfoModal({
          isVisible: showModal,
          onClose: () => this.setState({ showModal: false }),
          distanceFromTop: this.height * 0.38,
          children: (
            <GenericModalInfoContainerComponent
              title="Porque preciso informar meu número de CPF?"
              text="Os órgãos reguladores de carteiras digitais pedem que ele seja informado por todos os usuários. Mas não se preocupe, seus dados não serão compartilhados e estão em segurança. ;)"
              linkText="Entendi"
              linkPress={() => this.setState({ showModal: false })}
            />
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: verticalScale(50),
    justifyContent: 'space-around'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  lineItems: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  facebook: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lineItem: {
    height: 1,
    backgroundColor: colors.white,
    width: '40%'
  }
});
