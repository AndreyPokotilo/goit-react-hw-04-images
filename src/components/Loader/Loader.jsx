import css from "./Loader.module.css"

export function Loader() {
  return (
    <div className={css.rainbowLoaderBorder}>
      <div className={css.border}></div>
      <div className={css.glow}></div>
    </div>
  );
}
