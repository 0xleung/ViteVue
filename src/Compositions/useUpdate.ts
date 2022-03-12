import { Ref, ref, onMounted, onUnmounted } from 'vue'

export default function useUpdate(initX: number, initY: number, initColor: string = 'red'): [Ref<number>,Ref<number>,Ref<string>]{
    const x = ref(initX)
    const y = ref(initY)
    const color = ref(initColor)

    const update = (e: MouseEvent) => {
        x.value = e.clientX
        y.value = e.clientY

        x.value < document.body.offsetWidth/2 ? color.value = 'black' : color.value = 'red'
    }

    onMounted(() => {
        window.addEventListener('mousemove',update);
    })
    onUnmounted(() => {
        window.removeEventListener('mousemove',update);
    })
    return [x,y, color]
}