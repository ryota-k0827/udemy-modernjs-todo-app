import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する。
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグを生成
  const p = document.createElement("p");
  p.className = "list-title";
  p.innerText = text;

  // button(完了)生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの祖先タグ(li)を未完了リストから削除(closest)
    deleteFromIncompleteList(completeButton.closest("li"));

    // 完了リストに追加する要素
    const addTarget = completeButton.closest("div");

    // TODO内容を取得
    const text = addTarget.firstElementChild.innerText;

    // div以下を初期化
    addTarget.textContent = null;

    // li生成
    const li = document.createElement("li");

    // pタグ生成
    const p = document.createElement("p");
    p.className = "list-title";
    p.innerText = text;

    // button生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      const deleteTarget = backButton.closest("li");
      // 押された戻すボタンの祖先タグ(li)を完了リストから削除(closest)
      document.getElementById("complete-list").removeChild(deleteTarget);

      // 完了リストに追加する要素
      const addTarget = backButton.closest("div");

      // TODO内容を取得
      const text = addTarget.firstElementChild.innerText;

      createIncompleteList(text);
    });

    // divの子要素に各要素を設定 -> liにdivを入れ込む
    addTarget.appendChild(p);
    addTarget.appendChild(backButton);
    li.appendChild(addTarget);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(li);
  });

  // button(削除)生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの祖先タグ(li)を未完了リストから削除(closest)
    deleteFromIncompleteList(deleteButton.closest("li"));
    // 親タグの場合(parentNode)
    // deleteButton.parentNode;
  });

  // 未完了リストから指定の要素を削除
  const deleteFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
  };

  // divの子要素に各要素を設定 -> liにdivを入れ込む
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
