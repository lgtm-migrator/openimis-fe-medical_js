import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  AmountInput,
  FormPanel,
  PublishedComponent,
  TextInput,
  withHistory,
  withModulesManager,
  ErrorBoundary,
} from "@openimis/fe-core";

const styles = (theme) => ({
  tableTitle: theme.table.title,
  item: theme.paper.item,
  fullHeight: {
    height: "100%",
  },
});

class MedicalServiceMasterPanel extends FormPanel {
  render() {
    const { classes, edited, readOnly } = this.props;
    return (
      <ErrorBoundary>
        <Grid container className={classes.item}>
          <Grid item xs={2} className={classes.item}>
            <TextInput
              module="admin"
              required
              label="medical.service.code"
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.code : ""}
              onChange={(p) => this.updateAttribute("code", p)}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <TextInput
              module="admin"
              label="medical.service.name"
              required
              readOnly={readOnly}
              value={edited && edited.name ? edited.name : ""}
              onChange={(name) => this.updateAttributes({ name })}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="medical.ServiceTypePicker"
              withNull={true}
              required
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.type : ""}
              onChange={(p) => this.updateAttribute("type", p)}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.item}>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="medical.ServiceCategoryPicker"
              withNull={true}
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.category : null}
              onChange={(p) => this.updateAttribute("category", p)}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="medical.ServiceLevelPicker"
              withNull={true}
              required
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.level : ""}
              onChange={(p) => this.updateAttribute("level", p)}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <AmountInput
              module="admin"
              label="medical.service.price"
              required
              name="price"
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.price : ""}
              onChange={(p) => this.updateAttribute("price", p)}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.item}>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="medical.CareTypePicker"
              required
              withNull={true}
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.careType : ""}
              onChange={(p) => this.updateAttribute("careType", p)}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <TextInput
              module="admin"
              label="medical.service.frequency"
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.frequency : ""}
              onChange={(p) => this.updateAttribute("frequency", p)}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="medical.PatientCategoryPicker"
              readOnly={Boolean(edited.id) || readOnly}
              value={edited ? edited.patientCategory : ""}
              onChange={(p) => this.updateAttribute("patientCategory", p)}
            />
          </Grid>
        </Grid>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(
  withModulesManager(withHistory(connect(mapStateToProps)(withTheme(withStyles(styles)(MedicalServiceMasterPanel))))),
);
