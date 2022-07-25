<template>
  <div class="jquery-modal blocker current" style="opacity: 1" ref="modalError">
    <div
      class="modal-show"
      id="modal-error"
      style="opacity: 1; display: inline-block"
    >
      <img
        src="//theme.hstatic.net/200000031420/1000879437/14/alert.png?v=28"
        width="44"
        height="38"
      />
      <span class="title">Thông báo!</span>
      <p>Sản phẩm bạn vừa mua đã vượt quá tồn kho</p>
      <span class="close-modal" @click="handleClose"></span>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "error-template",
  setup() {
    const store = useStore();
    const modalError = ref();
    function handleClose() {
      // const modal = modalError.value.
      // modalError.value.style = "display: none;";
      store.dispatch("setModalError", false);
      console.log(modalError.value);
    }

    return { modalError, handleClose };
  },
};
</script>
<style scoped>
#modal-error {
  max-width: 320px;
  height: 210px;
  animation: show-modal 0.7s ease-in-out;
  text-align: center;
}
#modal-error .title {
  display: block;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  margin: 14px 0 5px 0;
}
#modal-error p {
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;
  margin: 0;
  padding: 0 30px;
}
#modal-error > img {
  margin-top: 24px;
}

#modal-subscribe {
  background: var(--bgsubcribe);
  background-size: 100%;
  padding: 0;
  max-width: 600px;
}
#modal-subscribe .modal-wp-ct {
  position: relative;
  padding: 50px 15px;
  float: right;
  background: rgba(255, 255, 255, 0.6);
  max-width: 55%;
}
@media (max-width: 767px) {
  #modal-subscribe .modal-wp-ct {
    max-width: 100%;
    width: 100%;
  }
}
#modal-subscribe .modal-wp-ct .tt-md-ct {
  font-size: 24px;
  margin: 0px 0px 10px;
  font-weight: 500;
}
#modal-subscribe .modal-wp-ct .content-md-ct {
  font-size: 14px;
  margin-bottom: 5px;
}
#modal-subscribe .modal-wp-ct .list-md-contact {
  list-style: initial;
  padding-left: 15px;
}
#modal-subscribe .modal-wp-ct form {
  margin-top: 30px;
  background-color: #fff;
  height: 45px;
  line-height: 45px;
  border: none;
  width: 100%;
  max-width: 100%;
  position: relative;
}
#modal-subscribe .modal-wp-ct form input {
  border: none;
  width: 100%;
  padding: 0 100px 0 10px;
}

.modal-show span.close-modal {
  position: absolute;
  top: -12.5px;
  right: -12.5px;
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  /* text-indent: -9999px; */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA3hJREFUaAXlm8+K00Acx7MiCIJH/yw+gA9g25O49SL4AO3Bp1jw5NvktC+wF88qevK4BU97EmzxUBCEolK/n5gp3W6TTJPfpNPNF37MNsl85/vN/DaTmU6PknC4K+pniqeKJ3k8UnkvDxXJzzy+q/yaxxeVHxW/FNHjgRSeKt4rFoplzaAuHHDBGR2eS9G54reirsmienDCTRt7xwsp+KAoEmt9nLaGitZxrBbPFNaGfPloGw2t4JVamSt8xYW6Dg1oCYo3Yv+rCGViV160oMkcd8SYKnYV1Nb1aEOjCe6L5ZOiLfF120EjWhuBu3YIZt1NQmujnk5F4MgOpURzLfAwOBSTmzp3fpDxuI/pabxpqOoz2r2HLAb0GMbZKlNV5/Hg9XJypguryA7lPF5KMdTZQzHjqxNPhWhzIuAruOl1eNqKEx1tSh5rfbxdw7mOxCq4qS68ZTjKS1YVvilu559vWvFHhh4rZrdyZ69Vmpgdj8fJbDZLJpNJ0uv1cnr/gjrUhQMuI+ANjyuwftQ0bbL6Erp0mM/ny8Fg4M3LtdRxgMtKl3jwmIHVxYXChFy94/Rmpa/pTbNUhstKV+4Rr8lLQ9KlUvJKLyG8yvQ2s9SBy1Jb7jV5a0yapfF6apaZLjLLcWtd4sNrmJUMHyM+1xibTjH82Zh01TNlhsrOhdKTe00uAzZQmN6+KW+sDa/JD2PSVQ873m29yf+1Q9VDzfEYlHi1G5LKBBWZbtEsHbFwb1oYDwr1ZiF/2bnCSg1OBE/pfr9/bWx26UxJL3ONPISOLKUvQza0LZUxSKyjpdTGa/vDEr25rddbMM0Q3O6Lx3rqFvU+x6UrRKQY7tyrZecmD9FODy8uLizTmilwNj0kraNcAJhOp5aGVwsAGD5VmJBrWWbJSgWT9zrzWepQF47RaGSiKfeGx6Szi3gzmX/HHbihwBser4B9UJYpFBNX4R6vTn3VQnez0SymnrHQMsRYGTr1dSk34ljRqS/EMd2pLQ8YBp3a1PLfcqCpo8gtHkZFHKkTX6fs3MY0blKnth66rKCnU0VRGu37ONrQaA4eZDFtWAu2fXj9zjFkxTBOo8F7t926gTp/83Kyzzcy2kZD6xiqxTYnHLRFm3vHiRSwNSjkz3hoIzo8lCKWUlg/YtGs7tObunDAZfpDLbfEI15zsEIY3U/x/gHHc/G1zltnAgAAAABJRU5ErkJggg==);
}
</style>
