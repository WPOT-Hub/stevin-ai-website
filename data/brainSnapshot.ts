/**
 * Bevroren, volledig fictief snapshot voor de Stevin Brain-visual.
 *
 * Dit is klant-veilige demodata (Lumos, een verzonnen entertainmentmerk). Er
 * zit bewust GEEN echte klantdata in en er wordt nooit een API of hub.stevin.ai
 * bevraagd: de JSON is een statisch bestand dat bij de build wordt meegebundeld.
 *
 * De laag hieronder doet drie dingen:
 *  1. types opleggen (geen any in de rest van de codebase),
 *  2. defensief nog een keer echte merknamen weren (belt en bretels),
 *  3. edges opschonen zodat er nooit een lijn naar een verwijderde node blijft.
 */

import rawSnapshot from './brainSnapshot.json'

export type BrainNodeType = 'campagne' | 'creatie' | 'outcome' | 'kennis'

export interface BrainNode {
  id: string
  label: string
  type: BrainNodeType
  period_label: string | null
  tags: string[]
  why: string | null
  delta: number | null
}

export interface BrainSnapshot {
  nodes: BrainNode[]
  edges: Array<[string, string]>
}

interface RawNode {
  id: string
  label: string
  type: string
  period_label?: string | null
  tags?: string[] | null
  why?: string | null
  delta?: number | null
}

interface RawSnapshot {
  nodes: RawNode[]
  edges: Array<[string, string]>
}

// Echte merknamen mogen nooit in een publieke asset lekken. De snapshot is al
// geschoond, dit is een laatste vangnet mocht er ooit iets doorheen glippen.
const BANNED = [
  'cirque',
  'kurios',
  'knokke',
  'june20',
  'van gestel',
  'vangestel',
  'alona',
  'avenue',
]

const VALID_TYPES: BrainNodeType[] = ['campagne', 'creatie', 'outcome', 'kennis']

function isBanned(n: RawNode): boolean {
  const hay = `${n.label} ${n.why ?? ''} ${(n.tags ?? []).join(' ')}`.toLowerCase()
  return BANNED.some((b) => hay.includes(b))
}

function isValidType(t: string): t is BrainNodeType {
  return (VALID_TYPES as string[]).includes(t)
}

const raw = rawSnapshot as unknown as RawSnapshot

const nodes: BrainNode[] = raw.nodes
  .filter((n) => isValidType(n.type) && !isBanned(n))
  .map((n) => ({
    id: n.id,
    label: n.label,
    type: n.type as BrainNodeType,
    period_label: n.period_label ?? null,
    tags: n.tags ?? [],
    why: n.why ?? null,
    delta: typeof n.delta === 'number' ? n.delta : null,
  }))

const kept = new Set(nodes.map((n) => n.id))
const edges: Array<[string, string]> = raw.edges.filter(
  ([a, b]) => kept.has(a) && kept.has(b),
)

export const brainSnapshot: BrainSnapshot = { nodes, edges }

export default brainSnapshot
