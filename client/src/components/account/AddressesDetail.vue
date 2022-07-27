<template>
  <div class="row">
    <div class="col-lg-12 clearfix">
      <div class="address_title">
        <h3>
          <strong>{{ getFullName() }}</strong>
        </h3>
        <p class="address_actions text-right">
          <span class="action_link action_edit">
            <a href="#"> <i class="fa-solid fa-pencil fa-sm"></i> </a
          ></span>
          <span class="action_link action_delete">
            <a href="#"> <i class="fa fa-times" aria-hidden="true"></i> </a
          ></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "address-detail-template",
  props: {
    address: { type: Object },
  },
  setup(props) {
    function getFullName() {
      if (!props.address) return "";
      return props.address.firstName + " " + props.address.lastName;
    }

    return { getFullName };
  },
};
</script>
<style scoped>
.address_title {
  margin-bottom: 0;
  font-size: 16px;
  padding: 10px 70px 10px 10px;
  background-color: #000000;
  border-color: #bce8f1;
  position: relative;
}
.address_title h3 {
  margin: 0;
  font-size: 14px;
  color: #fff;
}
.address_title * {
  color: #fff;
}
p.address_actions.text-right {
  margin: 7px 5px 0px 0;
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
}
span.action_link {
  padding: 8px;
}
.action_link a {
  text-transform: uppercase;
  font-size: 15px;
}
</style>
