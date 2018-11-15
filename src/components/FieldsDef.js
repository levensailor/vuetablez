import moment from "moment";
import accounting from "accounting";
import VuetableFieldHandle from "vuetable-2/src/components/VuetableFieldHandle.vue";
import VuetableFieldSequence from "vuetable-2/src/components/VuetableFieldSequence.vue";
import VuetableFieldCheckbox from "vuetable-2/src/components/VuetableFieldCheckbox.vue";

export default [
  {
    // name: '__handle',
    name: VuetableFieldHandle,
    width: "40px"
  },
  {
    name: VuetableFieldSequence,
    title: "No.",
    width: "50px",
    titleClass: "right aligned",
    dataClass: "right aligned"
  },
  {
    name: VuetableFieldCheckbox,
    title: "checkbox",
    width: "30px",
    titleClass: "center aligned",
    dataClass: "center aligned",
    togglable: true
  },
  {
    name: "id",
    title: '<i class="grey unordered list icon"></i>',
    width: "40px",
    titleClass: "center aligned",
    dataClass: "center aligned",
    formatter: (value, vuetable) => {
      let icon = vuetable.isVisibleDetailRow(value) ? "down" : "right";
      return [
        '<a class="show-detail-row">',
        '<i class="chevron circle ' + icon + ' icon"></i>',
        "</a>"
      ].join("");
    }
  },
  {
    name: "name",
    sortField: "name",
    title: '<i class="grey user outline icon"></i>Name',
    width: "20%",
    filterable: true,
    togglable: true
  },
  {
    name: "email",
    sortField: "email",
    title: '<i class="grey mail outline icon"></i>Email',
    width: "20%",
    filterable: true,
    togglable: true
  },
  {
    name: "group.description",
    sortField: "group.description",
    title: '<i class="grey sitemap icon"></i>Group',
    width: "10%",
    filterable: true,
    togglable: true
  },
  // {
  //   name: "birthdate",
  //   sortField: 'birthdate',
  //   title: '<i class="grey birthday icon"></i>Birthdate',
  //   width: "13%",
  //   formatter: (value) => {
  //     return (value === null)
  //       ? ''
  //       : moment(value, 'YYYY-MM-DD').format('MMM Do, YYYY')
  //   }
  // },
  {
    name: "gender",
    sortField: "gender",
    title: '<i class="grey heterosexual icon"></i>Gender',
    titleClass: "center aligned",
    dataClass: "center aligned",
    width: "12%",
    filterable: true,
    formatter: value => {
      return value.toUpperCase() === "M"
        ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
        : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>';
    },
    togglable: true
  },
  {
    name: "salary",
    sortField: "salary",
    title: '<i class="grey money icon"></i>Salary',
    titleClass: "center aligned",
    dataClass: "right aligned",
    width: "10%",
    filterable: true,
    formatter: value => accounting.formatNumber(value, 2),
    togglable: true
  },
  {
    name: "custom-actions",
    title: "Actions",
    width: "15%",
    titleClass: "center aligned",
    dataClass: "center aligned"
  }
];
