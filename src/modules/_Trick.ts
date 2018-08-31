export class FnTrick {
  /**
   * [fn.copyText] 复制文本到粘贴板
   * @param text [string]
   */
  public static copyText(text: string = ''): void {
    let textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.left = '200%';
    document.body.appendChild(textarea)
    textarea.value = text;
    textarea.select();
    document.execCommand('Copy');
    document.body.removeChild(textarea);
  }
}
